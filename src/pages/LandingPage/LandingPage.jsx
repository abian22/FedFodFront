import "./LandingPage.scss";
import { useThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import darkPizza from "../../assets/images/darkMode pizza.png";
import lightPizza from "../../assets/images/lightMode pizza.png";
import SignUpButton from "../../components/SignUpButton/SignUpButton";
import LoginButton from "../../components/LoginButton/LoginButton";

function LandingPage() {
  const { contextTheme } = useThemeContext();

  return (
    <>
      <main className="main">
        <img
          className="main__logo"
          src={contextTheme === "Light" ? lightPizza : darkPizza}
        />
      </main>
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
