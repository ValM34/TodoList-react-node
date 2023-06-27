import { useContext } from "react";
import { DarkModeContext } from "../../../../DarkModeProvider";
import { BgColorsOutlined } from "@ant-design/icons";

function SwitchTheme() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  console.log(darkMode);
  return (
    <BgColorsOutlined onClick={toggleDarkMode} style={{ fontSize: "20px" }} />
  );
}

export default SwitchTheme;
