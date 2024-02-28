import { useThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";

function SignUpButton({ onCreateAccount, style }) {
  const { contextTheme } = useThemeContext();
  

  return (
    <>
      <Link to="/signUp" style={{ textDecoration: "none", marginBottom:"20px" }}>
        <button className={style} id={contextTheme} onClick={onCreateAccount}>
          SIGN UP
        </button>
      </Link>
    </>
  );
}

export default SignUpButton;