import { Link, useNavigate } from 'react-router-dom';

function Header() {

  const navigate = useNavigate();

  const disconnect = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    localStorage.removeItem("token");
    if(window.location.pathname === "/"){
      return navigate(0);
    }
    navigate("/");
  }

  console.log(window.location.pathname)

  return (
    <header>
      <nav>
        <Link to="/">Accueil</Link>
        <Link to="/task/create">Créer une tâche</Link>
        <Link to="/connexion">Connexion</Link>
        <a onClick={disconnect} href="/">Déconnexion</a>
      </nav>
    </header>
  );
}

export default Header;