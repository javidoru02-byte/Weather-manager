import { NavLink } from "react-router-dom";
import "./TitleMenu.css";

function TitleMenu() {
  return (
    <nav className="titleMenu">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "titleMenuButton active" : "titleMenuButton"
        }
      >
        головна
      </NavLink>
      <NavLink
        to="/favourites"
        className={({ isActive }) =>
          isActive ? "titleMenuButton active" : "titleMenuButton"
        }
      >
        обране
      </NavLink>
    </nav>
  );
}

export default TitleMenu;
