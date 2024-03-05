import { useThemeContext } from "../../context/ThemeContext";
import { useState } from "react";
import SwitchComponent from "../SwitchComponent/SwitchComponent";
import { Link } from "react-router-dom";

import "./HeaderBeforeLogin.scss";
function HeaderBeforeLogin() {
  const { contextTheme, setContextTheme } = useThemeContext();
  const [checked, setChecked] = useState(true);

  const handleSwitch = (nextChecked) => {
    setContextTheme((state) => (state === "Light" ? "Dark" : "Light"));
    setChecked(nextChecked);
  };

  return (
    <>
      <div className="headerBeforeLogginContainer">
        <SwitchComponent handleSwitch={handleSwitch} checked={checked}/>
        <Link to="/" style={{ textDecoration: "none" }}>
          <svg
            id={contextTheme}
            className="headerBeforeLogginContainer__lightArrow"
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            stroke="#ffffff"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M20 15h-8v3.586a1 1 0 0 1 -1.707 .707l-6.586 -6.586a1 1 0 0 1 0 -1.414l6.586 -6.586a1 1 0 0 1 1.707 .707v3.586h8a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1z" />
          </svg>
        </Link>
        
      </div>
    </>
  );
}

export default HeaderBeforeLogin;
