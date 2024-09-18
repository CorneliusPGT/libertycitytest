import { connect } from "react-redux";
import React from "react";
import "./Users.css";
import { Users } from "./Users";
import preloader from "../../pics/loading.svg"
import { withAuthRedirect } from "../HOC/withAuthRedirect";
import { compose } from "redux";
import { selectLoading } from "../../redux/usersSelectors";

import { useSelector } from "react-redux";

export let UsersContainer: React.FC = () => {

  const isLoading = useSelector(selectLoading)

  return (
    <div>
      <div>{isLoading ? <img src={preloader} /> : null}</div>
      <Users
      />
    </div>
  );
};

export default compose<React.ComponentType>(withAuthRedirect, connect(null, {

}))(UsersContainer);