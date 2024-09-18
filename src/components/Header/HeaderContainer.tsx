
import "./Header.css";
import Header, { MapStateProps, MapDispatchProps } from "./Header";
import { getUserData } from "../../redux/authReducer";
import { connect } from "react-redux";
import { getLogout } from '../../redux/authReducer';
import { AppStateType } from "../../redux/reduxStore";
import React from "react";

const HeaderContainer: React.FC<MapStateProps & MapDispatchProps> = (props) => {

  return <Header {...props}></Header>;
};

let mapStateToProps = (state: AppStateType) => ({
  login: state.auth.login,
  isAuth: state.auth.isAuth
})



export default connect<MapStateProps, MapDispatchProps, {}, AppStateType>(mapStateToProps, { getUserData, getLogout })(HeaderContainer);
