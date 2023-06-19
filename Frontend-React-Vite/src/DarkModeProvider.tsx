import { createContext, useState } from 'react';

// Création du context pour le thème
export const DarkModeContext = createContext();

export default function DarkModeProvider({ children }) {
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
  
  function toggleDarkMode() {
    if(!darkMode.isActif){
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