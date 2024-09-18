import { NavLink } from "react-router-dom";
import s from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/profile" className={s.item}>
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/chat" className={s.item}>
            Chat
          </NavLink>
        </li>
        <li>
          <NavLink to="/dialogs" className={s.item}>
            Dialogs
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" className={s.item}>
            Users
          </NavLink>
        </li>
        <li>
          <a href="/news" className={s.item}>
            News
          </a>
        </li>
        <li>
          <NavLink to="/games" className={s.item}>
            Games
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
