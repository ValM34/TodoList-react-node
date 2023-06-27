import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { DarkModeContext } from "../../../../DarkModeProvider";
import SwitchTheme from "./SwitchTheme";

function Header({ isLoggedIn }) {
  const { darkMode } = useContext(DarkModeContext);

  const navigate = useNavigate();

  const disconnect = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    localStorage.removeItem("token");
    if (window.location.pathname === "/") {
      return navigate(0);
    }
    navigate("/");
  };

  return (
    <header
      className="header-main"
      style={{ backgroundColor: darkMode.primaryColor }}
    >
      <div className="header-main-container">
        <nav>
          <Link to="/">Accueil</Link>
          {isLoggedIn ? (
            <>
              <Link to="/task/create">Créer une tâche</Link>
              <a onClick={disconnect} href="/">
                Déconnexion
              </a>
            </>
          ) : (
            ""
          )}
          <SwitchTheme />
        </nav>
      </div>
    </header>
  );
}

export default Header;
