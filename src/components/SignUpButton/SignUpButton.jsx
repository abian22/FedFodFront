import { useThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";

function SignUpButton({ onCreateAccount, style }) {
  const { contextTheme } = useThemeContext();
  

  return (
    <>
        <button className={style} id={contextTheme} onClick={onCreateAccount}>
          SIGN UP
        </button>
    </>
  );
}

export default SignUpButton;
