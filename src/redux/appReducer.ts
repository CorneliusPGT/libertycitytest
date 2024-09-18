import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserData } from "./authReducer";
import { InferActionsType } from "./reduxStore";

let initialState = {
  initializing: false,
};

export type IntialStateType = typeof initialState;

export const getInitializing = createAsyncThunk(
  "app/getInitializing", async (_, {dispatch}) =>
  {
    let promise = dispatch(getUserData())
    promise.then(() => 
    {
      dispatch(appSlice.actions.initializingSucess())
    })
  }
)

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    initializingSucess(state, action: PayloadAction) {
      state.initializing = true;
    },
  },
});

export const {initializingSucess} = appSlice.actions;
export default appSlice.reducer

