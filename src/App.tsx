import "./App.css";
import preloader from "./pics/lcnight.jpg";
import preloader2 from "./pics/loading.svg";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import HeaderContainer from './components/Header/HeaderContainer';
import React, { Suspense, lazy, useEffect } from "react";
import { getInitializing } from "./redux/appReducer";
import { AppStateType } from "./redux/reduxStore";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";




const UsersContainer = lazy(() => import("./components/Users/UsersContainer"))
const DialogsContainer = lazy(() => import("./components/Dialogs/Dialogs"))
const Profile = lazy(() => import("./components/Profile/Profile"))
const ChatPage = lazy(() => import("./pages/Chat/ChatPage"))


const App: React.FC = (props) => {

  const dispatch = useDispatch()
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)


  const initializing = useSelector((state: AppStateType) => state.app.initializing,)
  useEffect(() => {
    dispatch<any>(getInitializing());
  }, [initializing]);
  if (!initializing) {
    return (
      <div>
        {" "}
        <img src={preloader}></img>
      </div>
    );
  }
  else
    return (

      <BrowserRouter>
        <div className="app-wrapper">
          <HeaderContainer />
          <Navbar />
          <Suspense fallback={preloader2}>
            <Routes>
              <Route path="/profile/:id?" element={<Profile />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route
                path="/dialogs/*"
                element={
                  <DialogsContainer
                  />
                }
              />
              <Route path="/users" element={<UsersContainer />}></Route>
              <Route path="/*" element={<FirstPage />}></Route>
              <Route path="/login" element={<Login />}></Route>
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
    );
};

const FirstPage = () => {
  return <div>
    Данный проект создавался по мере изучения React с самого нуля, на вёрстку я забил, сервер (не мой) работает так себе
    <a href="/login"></a>
  </div>
}

{/*  <BrowserRouter>
        <div className="app-wrapper">
          <HeaderContainer />
          <Navbar />
          <Suspense fallback={preloader2}>
            <Routes>
              <Route path="/profile/:id?" element={<Profile />} />
              <Route
                path="/dialogs/*"
                element={
                  <DialogsContainer
                  />
                }
              />
              <Route path="/users" element={<UsersContainer />}></Route>
              <Route path="/login" element={<Login />}></Route>
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter> */}
export default App;
