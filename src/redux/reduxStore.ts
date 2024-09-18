import {
  Action,
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import { usersReducer } from "./usersReducer";
import authReducer from "./authReducer";
import thunk, { ThunkAction } from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import appReducer from "./appReducer";
import { chatReducer } from "./chatReducer";
import { configureStore } from "@reduxjs/toolkit";

let rootReducer = combineReducers({
  profilePage: profileReducer,
  messagesPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
  chat: chatReducer,
});

type RootReducer = typeof rootReducer;

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never;

export type InferActionsType<
  T extends { [key: string]: (...args: any[]) => any }
> = ReturnType<PropertiesType<T>>;

export type BaseThunkType<A extends Action, R = void> = ThunkAction<
  R,
  AppStateType,
  unknown,
  A
>;

export let store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStateType = ReturnType<RootReducer>;
export type AppDispatch = typeof store.dispatch;
// @ts-ignore
window.store = store;
