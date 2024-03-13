import { useThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";

function SignUpButton({ onCreateAccount, style }) {
  const { contextTheme } = useThemeContext();

  return (
    <>
      <button
        className={style}
        type="button"
        id={contextTheme}
        onClick={onCreateAccount}
        style={{ marginBottom: "20px" }}
      >
        SIGN UP
      </button>
    </>
  );
}

export default SignUpButton;
