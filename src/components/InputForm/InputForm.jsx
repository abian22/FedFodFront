import { useThemeContext } from "../../context/ThemeContext";

function InputForm({
  title,
  placeholder,
  isFieldValid,
  iconStyle,
  icon,
  accountData,
  createAccountFunction,
  eyeIcon,
  handlePassword,
  isPassVisible,
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
          type={title === "Password" && isPassVisible === false? "password" : "text"}
          style={{
            borderColor: isFieldValid === false ? "red" : "black",
          }}
          onChange={(e) => accountData(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") createAccountFunction();
          }}
        />
        <img className={iconStyle} src={icon} alt="icon" />
        {title === "Password" && (
          <img
            className="formContainer__signUpLabel__eyeIcon"
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
