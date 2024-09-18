import "./ProfileInfo.css";
import preloader from "../../pics/loading.svg";
import { ProfileStatus } from "./ProfileStatus";
import React, { ChangeEvent, useState } from "react";
import { Contacts, ProfileDataForm } from "./ProfileDataForm";
import { Contacts as ContactsType, Profile } from "../../Types/types";
import { useSelector } from "react-redux";
import { AppStateType } from "../../redux/reduxStore";
import { saveProfileThunk, sendPhotoThunk } from "../../redux/profileReducer";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../../redux/reduxHooks";

type PropsInfo =
  {
    profile: Profile | null
    isOwner: boolean,
    authId: number | null,
    actualId: number | null,
  }

type PropsForm =
  {
    profile: Profile ,
    actualId: number | null,
    authId: number | null,
    isOwner: boolean,
    status: string,
    toEditMode: () => void

  }

const ProfileInfo: React.FC<PropsInfo> = (props) => {

  const status = useSelector((state: AppStateType) => state.profilePage.status)

  const dispatch = useAppDispatch()

  const [editMode, setEditMode] = useState(false);
  const onPicChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      dispatch(sendPhotoThunk(e.target.files[0]));
    }
  };
  const toEditMode = () => {
    setEditMode(true);
  }

  const saveForm = (data: Profile) => {
    let actualId = props.actualId
    dispatch<any>(saveProfileThunk({ data, id: actualId }));
    setEditMode(false)
  }

  if (props.profile === null) {
    return (
      <div>
        <img src={preloader}></img>
      </div>
    );
  }
  return (
    <div>
      <div>
        <img src="https://upload.wikimedia.org/wikipedia/ru/c/c3/Liberty_City_screenshot.png"></img>
      </div>
      {
        <div>
          <img
            className="avatar"
            src={
              props.profile.photos.large !== null
                ? props.profile.photos.large
                : "https://seeklogo.com/images/P/public-enemy-logo-E860A8D3AD-seeklogo.com.png"
            }
          ></img>
          {props.isOwner && <input type="file" onChange={onPicChange}></input>}
        </div>
      }
      <div>
        {editMode ? <ProfileDataForm status={status} profile={props.profile} authId={props.authId} actualId={props.actualId} saveForm={saveForm} /> : <ProfileData status={status} profile={props.profile} actualId={props.actualId} authId={props.authId} isOwner={props.isOwner} toEditMode={toEditMode}></ProfileData>}
      </div>
    </div>
  );
};

const ProfileData = (props: PropsForm) => {

  return <div>
    {props.isOwner ? <div><button onClick={props.toEditMode}>Edit</button></div> : null}
    <h2>{props.profile.fullName}</h2>
    <ProfileStatus
      actualId={props.actualId}
      authId={props.authId}
      status={props.status}
    />
    <div>About me: {props.profile.aboutMe}</div>
    <div>Looking for a job: {props.profile.lookingForAJob === true ? "YES" : "NO"}</div>
    {props.profile.lookingForAJob === true ? <div>Professional Skills: {props.profile.lookingForAJobDescription}</div> : ''}
    <div>
      <b>Contacts</b>: {Object.keys(props.profile.contacts).map(key => {
        return <Contacts contactTitle={key} contactKey={props.profile.contacts[key as keyof ContactsType]} />
      })}
    </div>
  </div>
}


export default ProfileInfo;
