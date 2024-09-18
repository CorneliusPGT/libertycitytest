import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { AppStateType } from "../../redux/reduxStore";

type MapStateProps =
  {
    isAuth: boolean
  }


export function withAuthRedirect(Component: React.ComponentType<MapStateProps>) {
  let mapStateToProps = (state: AppStateType): MapStateProps =>
  ({
    isAuth: state.auth.isAuth
  })

  let RedirectComponent: React.FC<MapStateProps> = (props) => {
    let navigate = useNavigate();
    useEffect(() => {
      if (props.isAuth === false) {
        return navigate("../login");
      }
    }, [props.isAuth]);

    return <Component {...props}></Component>
  };

  let UltimateComponent = connect(mapStateToProps, {})(RedirectComponent)

  return UltimateComponent;


};
