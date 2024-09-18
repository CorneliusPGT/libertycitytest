import { profileAPI } from "../API/profile-api";
import { Posts, Profile, Photos } from "../Types/types";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

type GetProfileError = {
  message: string;
};

let initialState = {
  posts: [
    { id: 1, message: "Hello, World!", likeCount: 99 },
    { id: 2, message: "Howdy lads!", likeCount: 12 },
  ] as Array<Posts>,
  profile: null as Profile | null,
  status: "",
  newPostText: "",
};

export const getProfile = createAsyncThunk<void, number | null>(
  "profile/getProfile",
  async (id, { rejectWithValue, dispatch }) => {
    const res = await profileAPI.getProfile(id);
    dispatch(profileSlice.actions.setProfile(res.data));
  }
);

export const getStatus = createAsyncThunk<void, number>(
  "profile/getStatus",
  async (id, { rejectWithValue, dispatch }) => {
    const res = await profileAPI.getStatus(id);
    dispatch(profileSlice.actions.setStatus(res.data));
  }
);

export const saveProfileThunk = createAsyncThunk(
  "profile/saveProfile",
  async (
    { data, id }: { data: Profile; id: number | null },
    { rejectWithValue, dispatch }
  ) => {
    const res = await profileAPI.saveProfile(data);
    if (res.data.resultCode === 0) {
      dispatch(getProfile(id));
    }
  }
);

export const sendPhotoThunk = createAsyncThunk<void, File>(
  "profile/sendPhotoThunk",
  async (image, { rejectWithValue, dispatch }) => {
    const res = await profileAPI.sendPhoto(image);
    if (res.data.resultCode === 0) {
      dispatch(setPhoto(res.data.data.photos));
    }
  }
);

export const updateStatusThunk = createAsyncThunk<void, string>(
  "profile/updateStatusThunk",
  async (status, { rejectWithValue, dispatch }) => {
    const res = await profileAPI.updateStatus(status);
    if (res.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    addPost(state, action: PayloadAction<string>) {
      let newPost = {
        id: state.posts.length + 1,
        message: action.payload,
        likeCount: 0,
      };
      state.posts.push(newPost);
    },
    setStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
    setProfile(state, action: PayloadAction<Profile>) {
      state.profile = action.payload;
    },
    setPhoto(state, action: PayloadAction<Photos>) {
      if (state.profile) state.profile.photos = action.payload;
    },
  },
});

export const { addPost, setStatus, setPhoto, setProfile } =
  profileSlice.actions;
export default profileSlice.reducer;
