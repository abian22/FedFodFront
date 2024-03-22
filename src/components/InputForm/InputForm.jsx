import { useThemeContext } from "../../context/ThemeContext";

function InputForm({
  title,
  placeholder,
  isFieldValid,
  iconStyle,
  icon,
  accountData,
  loginOrSignupFunction,
  eyeIcon,
  handlePassword,
  isPassVisible,
  eyeIconStyle,
}) {
  const { contextTheme } = useThemeContext();

  return (
    <>
      <label className="formContainer__signUpLabel">
        <div
          className="formContainer__signUpLabel--inputTitle"
          id={contextTheme}
          style={{ color: isFieldValid === false ? "red" : "" }}
        >
          {title}
        </div>
        <input
          className="formContainer__signUpInput"
          placeholder={placeholder}
          type={
            (title === "Password" ||
              title === "New password" ||
              title === "Confirm new password") &&
            isPassVisible === false
              ? "password"
              : "text"
          }
          style={{
            borderColor: isFieldValid === false ? "red" : "black",
          }}
          onChange={(e) => accountData(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") loginOrSignupFunction();
          }}
        />
        <img className={iconStyle} src={icon} alt={icon} />
        {title.toLowerCase().includes("password") && (
          <img
            className={eyeIconStyle}
            onClick={handlePassword}
            src={eyeIcon}
            alt="icon"
          />
        )}
      </label>
    </>
  );
}

export default InputForm;
