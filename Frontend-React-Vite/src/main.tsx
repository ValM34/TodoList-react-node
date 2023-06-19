import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.scss";
import App from './App';
import DarkModeProvider from "./DarkModeProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <DarkModeProvider>
    <App />
  </DarkModeProvider>
);
