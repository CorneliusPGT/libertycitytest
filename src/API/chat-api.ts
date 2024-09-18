type MessagesSubscriberType = (messages: ChatMessageType[]) => void;
type StatusSubscriberType = (status: StatusType) => void;

export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};

type EventNamesType = "messages-received" | "status-changed";

let subcribers = {
  "messages-received": [] as MessagesSubscriberType[],
  "status-changed": [] as StatusSubscriberType[],
};

let wsC: WebSocket;

let messagesHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data);
  subcribers["messages-received"].forEach((s) => s(newMessages));
};

let openHandler = () => {
  notifySubscribers("ready");
};

let errorHandler = () => {
  notifySubscribers("error");
};

const closeHandler = () => {
  createChannel();
};
export const createChannel = () => {
  cleanUp();
  wsC = new WebSocket(
    "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
  );
  notifySubscribers("pending");
  wsC.addEventListener("close", closeHandler);
  wsC.addEventListener("message", messagesHandler);
  wsC.addEventListener("open", openHandler);
  wsC.addEventListener("error", errorHandler);
};

const cleanUp = () => {
  wsC?.removeEventListener("close", closeHandler);
  wsC?.removeEventListener("message", messagesHandler);
  wsC?.removeEventListener("open", openHandler);
  wsC?.removeEventListener("error", errorHandler);
};

const notifySubscribers = (status: StatusType) => {
  subcribers["status-changed"].forEach((s) => s(status));
};

export const chatAPI = {
  start() {
    createChannel();
  },
  stop() {
    subcribers["messages-received"] = [];
    subcribers["status-changed"] = [];
    cleanUp();
    wsC?.close();
  },
  subscribeOnMessages(
    eventName: EventNamesType,
    callback: MessagesSubscriberType | StatusSubscriberType
  ) {
    //@ts-ignore
    subcribers[eventName].push(callback);
    return () => {
      //@ts-ignore
      subcribers[eventName] = subcribers[eventName].filter(
        (s) => s !== callback
      );
    };
  },
  unsubscribeFromMessage(
    eventName: EventNamesType,
    callback: MessagesSubscriberType | StatusSubscriberType
  ) {
    //@ts-ignore
    subcribers[eventName] = subcribers[eventName].filter((s) => s !== callback);
  },
  sendMessage(message: string) {
    wsC?.send(message);
  },
};

export type StatusType = "pending" | "ready" | "error";
