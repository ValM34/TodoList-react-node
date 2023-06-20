import { createContext, useState, useEffect } from 'react';

// Création du context pour le thème
export const DarkModeContext = createContext();

export default function DarkModeProvider({ children }) {

  let isActive = localStorage.getItem('darkMode');

  const [darkMode, setDarkMode] = useState({
    isActif: false,
    primaryColor: "#00b96b",
    secondaryColor: "#b9ffe1",
    backgroundMainColor: "white",
    textColorPrimary: "black",
    textColorSecondary: "white",
    className: "light-mode",
    errorColor: "red",
    succesColor: "#006f40"
  });

  useEffect(() => {
    if(isActive === "true"){
      toggleDarkMode();
    }
  }, [])
  
  function toggleDarkMode() {
    if(!darkMode.isActif){
      localStorage.setItem('darkMode', JSON.stringify(true));
      return setDarkMode({
        isActif: true,
        primaryColor: "#006f40",
        secondaryColor: "#002515",
        backgroundMainColor: "#000805",
        textColorPrimary: "#d4d4d4",
        textColorSecondary: "black",
        className: "dark-mode",
        errorColor: "darkred",
        succesColor: "#006f40"
      });
    }

    localStorage.setItem('darkMode', JSON.stringify(false));
    return setDarkMode({
      isActif: false,
      primaryColor: "#00b96b",
      secondaryColor: "#b9ffe1",
      backgroundMainColor: "white",
      textColorPrimary: "black",
      textColorSecondary: "white",
      className: "light-mode",
      errorColor: "red",
      succesColor: "#006f40"
    })
  }

  return (
    <DarkModeContext.Provider value={ {darkMode, toggleDarkMode} }>
      {children}
    </DarkModeContext.Provider>
  )
}

// Fin création du context pour le thème