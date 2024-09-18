/* import { rerenderEntireTree } from "../index.js"; */

import { dialogsReducer } from "./dialogsReducer";
import { profileReducer } from "./profileReducer";

export let store = {
  state: {
    profilePage: {
      posts: [
        { id: 1, message: "Hello, World!", likeCount: 99 },
        { id: 2, message: "Howdy lads!", likeCount: 12 },
      ],
      newPostText: "",
    },

    messagesPage: {
      dialogs: [
        { id: 1, name: "Jamal" },
        { id: 2, name: "Umar" },
        { id: 3, name: "Patel" },
        { id: 4, name: "Kumar" },
        { id: 5, name: "Pavir" },
      ],

      messages: [
        { id: 1, message: "Howdy" },
        { id: 2, message: "Howdy1" },
        { id: 3, message: "Howdy2" },
      ],
      newMessageText: "",
    },
  },
  getState() {
    return this.state;
  },
  rerenderEntireTree() {},
  /*  addPost() {
  
  }, */
  /*  updateNewPostText(newText) {
    this.state.profilePage.newPostText = newText;
    this.rerenderEntireTree(this.state);
  }, */

  subscribe(observer) {
    this.rerenderEntireTree = observer;
  },

  dispatch(action) {

    profileReducer(this.state.profilePage, action);
    dialogsReducer(this.state.messagesPage, action);

    this.rerenderEntireTree(this.state);
   
  },
};




window.store = store;
