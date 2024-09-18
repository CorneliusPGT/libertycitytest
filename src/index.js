import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./redux/reduxStore";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { storeContext } from "./storeContext";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
let rerenderEntireTree = (state) => {
  root.render(
     <React.StrictMode> 
      <storeContext.Provider value={store}>
        <Provider store={store}>
          <App /* state={state} dispatch={store.dispatch.bind(store)} store={store} */
          />
        </Provider>
      </storeContext.Provider>
     </React.StrictMode> 
  );
};

rerenderEntireTree(store.getState());
store.subscribe(() => {
  rerenderEntireTree(store.getState());
});
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
