import { useThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";

function LoginButton({ onLogin, style }) {
  const { contextTheme } = useThemeContext();

  return (
    <>
      <button
        className={style}
        id={contextTheme}
        onClick={onLogin}
        type="button"
        style={{ marginBottom: "20px" }}
      >
        LOG IN
      </button>
    </>
  );
}

export default LoginButton;
