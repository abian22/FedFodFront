import "./LandingPage.scss";
import { useThemeContext } from "../../context/ThemeContext";
import darkPizza from "../../assets/images/darkMode pizza.png";
import lightPizza from "../../assets/images/lightMode pizza.png";
import { Link } from "react-router-dom";


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
        <Link to="/login" style={{textDecoration:"none"}}>
        <button className="section__buttons" id={contextTheme}>
          LOG IN
        </button>
        </Link>
        <Link to="/signUp" style={{textDecoration:"none"}}>
        <button className="section__buttons" id={contextTheme}>
          SIGN UP
        </button>
        </Link>
      </section>
    </>
  );
}

export default LandingPage;
