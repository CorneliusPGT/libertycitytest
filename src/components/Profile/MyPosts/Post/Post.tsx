import React from "react";
import "./Post.css";
import { Profile } from "../../../../Types/types";

type Props =
  {
    profile: Profile | null
    message: string,
    likeCount: number
  }

const Post: React.FC<Props> = (props) => {
  return (
    <div>
      <img
        src={props.profile?.photos.small ? props.profile?.photos.small?.toString() : 'https://seeklogo.com/images/P/public-enemy-logo-E860A8D3AD-seeklogo.com.png'}
        className="avatarPost"
      />
      {props.message}
      <div>{props.likeCount}</div>
    </div>
  );
};

export default Post;
