import { useThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";

function LoginButton({ onLogin, style }) {
  const { contextTheme } = useThemeContext();

  return (
    <>
      <Link to="/login" style={{ textDecoration: "none", marginBottom:"20px" }}>
        <button
          className={style}
          id={contextTheme}
          onClick={onLogin}
        >
          LOG IN
        </button>
      </Link>
    </>
  );
}

export default LoginButton;
