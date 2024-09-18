import { NavLink } from "react-router-dom";
import "./Header.css";

type Props = MapStateProps & MapDispatchProps

export type MapStateProps =
  {

    isAuth: boolean
    login: string | null

  }

export type MapDispatchProps =
  {
    getLogout: () => void
    getUserData: () => void
  }

const Header: React.FC<Props> = (props) => {

  const logOut = () => {
    props.getLogout();
  }
  return (
    <header>
      <div className={"headerMain"}>
        <img
          className={"Applogo"}
          src="https://clipart-library.com/images_k/statue-of-liberty-silhouette-vector/statue-of-liberty-silhouette-vector-18.png"
        ></img>
        <section className={"loginSec"}>
          {props.isAuth ? props.login : <NavLink to="/login">Login</NavLink>}
          {props.isAuth && (<div><button onClick={logOut}>Logout</button></div>)}
        </section>
      </div>

    </header>
  );
};

export default Header;
