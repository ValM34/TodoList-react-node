import { useState, useRef } from "react";
import HomeWhenUserIsLoggedIn from './HomeWhenUserIsLoggedIn';

function Home() {
  const [tab, setTab] = useState(1);

  const openConnexionTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTab(1);
  }
  const opensubscriptionTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTab(2);
  }

  const emailRef = useRef();
  const passwordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const onConnexionSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(
      emailRef?.current?.value !== undefined &&
      emailRef?.current?.value.length > 0 &&
      passwordRef?.current?.value !== undefined &&
      passwordRef?.current?.value.length > 0
    ){
      fetch('http://127.0.0.1:3000/user/connexion', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value
        })
      })
        .then(res => res.json())
        .then(res => {
          localStorage.setItem("token", res.token);
          verifyConnexion();
        })
    }
  }

  const onSubscriptionSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(
      firstNameRef?.current?.value !== undefined &&
      firstNameRef?.current?.value.length > 0 &&
      lastNameRef?.current?.value !== undefined &&
      lastNameRef?.current?.value.length > 0 &&
      emailRef?.current?.value !== undefined &&
      emailRef?.current?.value.length > 0 &&
      passwordRef?.current?.value !== undefined &&
      passwordRef?.current?.value.length > 0
    ){
      fetch('http://127.0.0.1:3000/user/subscription', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
          firstName: firstNameRef.current.value,
          lastName: lastNameRef.current.value
        })
      })
        .then(res => res.json())
        .then(res => {
          console.log(res);
        })
    }
  }


  
  const verifyConnexion = () => {
    const ls = localStorage.getItem("token");
    fetch('http://127.0.0.1:3000/user/verify', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": ls
      }
    })
      .then(res => res.json())
      .then(res => {
        if(res.userId > 0){
          setIsLoggedIn(true);
        }
      })
  }
  verifyConnexion();


  // Remplacer par la vérification du token
  if(isLoggedIn){
    return <HomeWhenUserIsLoggedIn />
  }

  if(tab === 1) {
    return (
      <form>
        <div>
          <button onClick={openConnexionTab}>Connexion</button>
          <button onClick={opensubscriptionTab}>Inscription</button>
        </div>
        <label htmlFor="email">Email</label>
        <input type="text" ref={emailRef} name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" ref={passwordRef} name="password" id="password" />
        <button onClick={onConnexionSubmit}>Valider</button>
      </form>
    );
  } else if(tab === 2) {
    return (
      <form>
        <div>
          <button onClick={openConnexionTab}>Connexion</button>
          <button onClick={opensubscriptionTab}>Inscription</button>
        </div>
        <label htmlFor="lastName">Nom</label>
        <input type="text" ref={lastNameRef} name="lastName" id="lastName" />
        <label htmlFor="firstName">Prénom</label>
        <input type="text" ref={firstNameRef} name="firstName" id="firstName" />
        <label htmlFor="email">Email</label>
        <input type="text" ref={emailRef} name="email" id="email" />
        <label htmlFor="password">Mot de passe</label>
        <input type="password" ref={passwordRef} name="password" id="password" />
        <button onClick={onSubscriptionSubmit}>Valider</button>
      </form>
    );
  }
}

export default Home;