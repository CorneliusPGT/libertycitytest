import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InferActionsType } from "./reduxStore";

export type DialogType = {
  id: number;
  name: string;
};

export type MessagesType = {
  id: number;
  message: string;
};

let initialState = {
  dialogs: [
    { id: 1, name: 12 },
    { id: 2, name: "Jimi Hendrix" },
    { id: 3, name: "Jerry" },
    { id: 4, name: "Yngwie" },
    { id: 5, name: "Oscar" },
  ] as Array<DialogType>,

  messages: [
    { id: 1, message: "Howdy" },
    { id: 2, message: "Howdy1" },
    { id: 3, message: "Howdy2" },
  ] as Array<MessagesType>,
};

export type InitialStateType = typeof initialState;

const dialogsSlice = createSlice({
  name: "dialogs",
  initialState,
  reducers: {
    sendMessageAC(state, action: PayloadAction<string>) {
      let newMessage = {
        id: state.messages.length + 1,
        message: action.payload,
      };
      state.messages.push(newMessage);
    },
  },
});

export const { sendMessageAC } = dialogsSlice.actions;
export default dialogsSlice.reducer;
