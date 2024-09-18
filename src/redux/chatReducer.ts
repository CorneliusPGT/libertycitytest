import { authAPI } from "../API/auth-api";
import { ResultCode, ResultCodeCaptcha } from "../API/api";
import { BaseThunkType, InferActionsType } from "./reduxStore";
import { ChatMessageType, StatusType, chatAPI } from "../API/chat-api";
import { Dispatch } from "redux";

type ChatReducerType = ChatMessageType & { id: string };

let initialState = {
  messages: [] as ChatMessageType[],
  status: "pending" as StatusType,
};

export type InitialStateType = typeof initialState;
type ThunkType = BaseThunkType<ActionsType>;

export const chatReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "RECEIVED_MESSAGES": {
      return {
        ...state,
        messages: [...state.messages, ...action.data].filter(
          (n, index, array) => index >= array.length - 14
        ),
      };
    }
    case "STATUS_CHANGED":
      return {
        ...state,
        status: action.data.status,
      };
    default:
      return state;
  }
};

const actions = {
  receivedMessages: (messages: ChatMessageType[]) =>
    ({
      type: "RECEIVED_MESSAGES",
      data: messages,
    } as const),
  statusChanged: (status: StatusType) =>
    ({
      type: "STATUS_CHANGED",
      data: { status },
    } as const),
};

type ActionsType = InferActionsType<typeof actions>;

let newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;
let statusChangedHandler: ((status: StatusType) => void) | null = null;

const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (newMessageHandler === null) {
    newMessageHandler = (messages) => {
      dispatch(actions.receivedMessages(messages));
    };
  }
  return newMessageHandler;
};

const newStatusChangedCreator = (dispatch: Dispatch) => {
  if (statusChangedHandler === null) {
    statusChangedHandler = (status) => {
      dispatch(actions.statusChanged(status));
    };
  }
  return statusChangedHandler;
};

export const getReceivedMessages = (): ThunkType => (dispatch) => {
  if (!newMessageHandler) {
    newMessageHandler = newMessageHandlerCreator(dispatch);
  }

  if (!statusChangedHandler) {
    statusChangedHandler = newStatusChangedCreator(dispatch);
  }

  chatAPI.start();
  chatAPI.subscribeOnMessages("messages-received", newMessageHandler);
  chatAPI.subscribeOnMessages("status-changed", statusChangedHandler);
};

export const stopReceivedMessages = (): ThunkType => (dispatch) => {
  if (newMessageHandler) {
    chatAPI.unsubscribeFromMessage("messages-received", newMessageHandler);
  }

  if (statusChangedHandler) {
    chatAPI.unsubscribeFromMessage("status-changed", statusChangedHandler);
  }

  chatAPI.stop();
};

export const sendChatMessage =
  (message: string): ThunkType =>
  (dispatch) => {
    chatAPI.sendMessage(message);
  };
