import "./LandingPage.scss";
import { useThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import darkPizza from "../../assets/images/darkMode pizza.png";
import lightPizza from "../../assets/images/lightMode pizza.png";
import SignUpButton from "../../components/SignUpButton/SignUpButton";
import LoginButton from "../../components/LoginButton/LoginButton";
import SwitchComponent from "../../components/SwitchComponent/SwitchComponent";
import LanguageButton from "../../components/LanguageButton/LanguageButton";

function LandingPage() {
  const { contextTheme, setContextTheme } = useThemeContext();
  const [checked, setChecked] = useState(true);

  const handleSwitch = (nextChecked) => {
    setContextTheme((state) => (state === "Light" ? "Dark" : "Light"));
    setChecked(nextChecked);
  };

  return (
    <>
      <div className="languageSwitchButtonWrapper">
        <div style={{ marginTop: "6px" }}>
          <LanguageButton />
        </div>
        <SwitchComponent handleSwitch={handleSwitch} checked={checked} />
      </div>
      <main className="main">
        <img
          className="main__logo"
          src={contextTheme === "Light" ? lightPizza : darkPizza}
        />
      </main>
      <div className="centerContainer" style={{fontSize:"40px", marginTop:"30px"}}>
      FedFod
      </div>
     
      <section className="section">
        <Link to="/login" style={{ textDecoration: "none" }}>
          <LoginButton style={"section__buttons"} />
        </Link>
        <Link to="/signUp" style={{ textDecoration: "none" }}>
          <SignUpButton style={"section__buttons"} />
        </Link>
      </section>
    </>
  );
}

export default LandingPage;
