
import React, { useEffect } from "react";

import "./Profile.css";
import ProfileInfo from "./ProfileInfo";
import { Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppStateType } from "../../redux/reduxStore";
import { useDispatch } from "react-redux";
import { getProfile, getStatus } from "../../redux/profileReducer";
import MyPosts from "./MyPosts/MyPosts";


type ParamsType =
  {
    id: string
  }

const Profile: React.FC = () => {

  const dispatch = useDispatch()
  const authId = useSelector((state: AppStateType) => state.auth.id)
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
  const profile = useSelector((state: AppStateType) => state.profilePage.profile)
  let { id } = useParams<ParamsType>();
  let id1: number | null = Number(id);
  let isOwner = false;
  if (!id1) {
    id1 = authId;
  }
  if (authId === id1) {
    isOwner = true
  }
  else isOwner = false

  useEffect(() => {
    if (id1 !== null) {
      dispatch<any>(getProfile(id1));
      dispatch<any>(getStatus(id1));
    }
  }, [id1]);
  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  return (
    <div className={"content"}>
      <div>
        <ProfileInfo profile={profile} isOwner={isOwner} actualId={authId} authId={id1} />
        <MyPosts profile={profile}/>
      </div>
    </div>
  );
};

export default Profile;
