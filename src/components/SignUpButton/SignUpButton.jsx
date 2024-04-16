import { useThemeContext } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";


function SignUpButton({ onCreateAccount, style }) {
  const { contextTheme } = useThemeContext();
  const [t, i18n] = useTranslation("global");

  return (
    <>
      <button
        className={style}
        type="button"
        id={contextTheme}
        onClick={onCreateAccount}
        style={{ marginBottom: "20px" }}
      >
        {t("signUpButton.signUp")}
      </button>
    </>
  );
}

export default SignUpButton;
