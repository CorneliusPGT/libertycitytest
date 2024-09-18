import { authAPI } from "../API/auth-api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

let initialState = {
  id: null as number | null,
  login: null as string | null,
  email: null as string | null,
  isAuth: false,
  url: null as string | null,
};

type SetUserData = {
  id: number | null;
  login: string | null;
  email: string | null;
  isAuth: boolean;
};

export const getUserData = createAsyncThunk(
  "auth/getUserData",
  async (_, { dispatch }) => {
    authAPI.getLogin().then((res) => {
      if (res.resultCode === 0) {
        let { id, login, email } = res.data;
        dispatch(
          authSlice.actions.setUserData({ id, login, email, isAuth: true })
        );
      }
    });
  }
);

export const sendUser = createAsyncThunk(
  "auth/sendUser",
  async (
    {
      email,
      password,
      rememberMe,
      captcha,
      setFieldError,
    }: {
      email: string;
      password: string;
      rememberMe: boolean;
      captcha: string;
      setFieldError: Function;
    },
    { rejectWithValue, dispatch }
  ) => {
    authAPI.sendData(email, password, rememberMe, captcha).then((res) => {
      if (res.resultCode === 0) {
        dispatch(getUserData());
      } else {
        if (res.resultCode === 10) {
          dispatch(getCaptchaThunk());
        }
        setFieldError("server", res.messages);
      }
    });
  }
);

export const getLogout = createAsyncThunk(
  "auth/getLogout",
  async (_, { dispatch }) => {
    authAPI.logout().then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(
          authSlice.actions.setUserData({
            id: null,
            email: null,
            login: null,
            isAuth: false,
          })
        );
      }
    });
  }
);

export const getCaptchaThunk = createAsyncThunk(
  "auth/getCaptchaThunk",
  async (_, { dispatch }) => {
    authAPI.getCaptcha().then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(authSlice.actions.setCaptcha(res.data.url));
      }
    });
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<SetUserData>) {
      return { ...state, ...action.payload };
    },
    setCaptcha(state, action: PayloadAction<string>) {
      state.url = action.payload;
    },
  },
});

export const { setUserData, setCaptcha } = authSlice.actions;
export default authSlice.reducer;
