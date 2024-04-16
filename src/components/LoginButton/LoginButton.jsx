import { useThemeContext } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";


function LoginButton({ onLogin, style }) {
  const { contextTheme } = useThemeContext();
  const [t, i18n] = useTranslation("global");


  return (
    <>
      <button
        className={style}
        id={contextTheme}
        onClick={onLogin}
        type="button"
        style={{ marginBottom: "20px" }}
      >
        {t("logginButton.loggin")}
      </button>
    </>
  );
}

export default LoginButton;
