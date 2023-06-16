import { Link, useNavigate } from 'react-router-dom';

function Header({ isLoggedIn }) {

  const navigate = useNavigate();

  const disconnect = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    localStorage.removeItem("token");
    if(window.location.pathname === "/"){
      return navigate(0);
    }
    navigate("/");
  }

  return (
    <header className="header-main">
      <div className="header-main-container">
        <nav>
          <Link to="/">Accueil</Link>
          {isLoggedIn ? 
            <>
              <Link to="/task/create">Créer une tâche</Link>
              <a onClick={disconnect} href="/">Déconnexion</a>
            </>
            : ""
          }
        </nav>
      </div>
    </header>
  );
}

export default Header;