import { NavLink } from "react-router-dom";
import css from "./AuthNav.module.css";
import clsx from "clsx";
export const AuthNav = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <div>
      <NavLink className={buildLinkClass} to="/register">
        REGISTER
      </NavLink>
      <NavLink className={buildLinkClass} to="/login">
        LOG IN
      </NavLink>
    </div>
  );
};
