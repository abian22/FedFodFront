import "./SignUp.scss";
import { useThemeContext } from "../../context/ThemeContext";
import google from "../../assets/icons/icons8-google.svg";
import darkUser from "../../assets/icons/darkUser.svg";
import darkEmail from "../../assets/icons/darkEmail.svg";
import darkPassword from "../../assets/icons/darkPassword.svg";
import darkEye from "../../assets/icons/darkEye.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signUp } from "../../services/auth";

function SignUp() {
  const navigate = useNavigate();
  const { contextTheme } = useThemeContext();
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(null);
  const [isPasswordValid, setIsPasswordValid] = useState(null);
  const [account, setAccount] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handlePassword() {
    setIsPassVisible(!isPassVisible);
  }

  async function createAccount() {
    const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    try {
      if (account.username.trim() === "") {
        setIsUsernameValid(false);
      } else setIsUsernameValid(true);

      if (!emailValidation.test(account.email)) {
        setIsEmailValid(false);
      } else setIsEmailValid(true);

      if (account.password.trim() === "") {
        setIsPasswordValid(false);
      } else setIsPasswordValid(true);

      const signUpResponse = await signUp({
        username: account.username,
        email: account.email,
        password: account.password,
      });
      localStorage.setItem("token", signUpResponse.data.token);
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      alert("Any field is invalid");
    }
  }

  return (
    <>
      <div className="signUpContainer ">
        <h2>SignUp</h2>
      </div>
      <div className="container">
        <form className="formContainer">
          <label className="formContainer__signUpLabel">
            <div
              className="formContainer__signUpLabel--inputTitle"
              style={{ color: isUsernameValid === false ? "red" : "white" }}
            >
              Username
            </div>
            <input
              className="formContainer__signUpInput"
              placeholder="Your Username..."
              style={{
                borderColor: isUsernameValid === false ? "red" : "white",
              }}
              onChange={(e) =>
                setAccount({ ...account, username: e.target.value })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") createAccount();
              }}
            />
            <img
              className="formContainer__signUpLabel__userIcon"
              src={darkUser}
              alt="icon"
            />
          </label>
          <label className="formContainer__signUpLabel">
            <div
              className="formContainer__signUpLabel--inputTitle"
              style={{ color: isEmailValid === false ? "red" : "white" }}
            >
              Email
            </div>
            <input
              className="formContainer__signUpInput"
              placeholder="Example@gmail.com"
              style={{ borderColor: isEmailValid === false ? "red" : "white" }}
              onChange={(e) =>
                setAccount({ ...account, email: e.target.value })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") createAccount();
              }}
            />
            <img
              className="formContainer__signUpLabel__emailIcon"
              src={darkEmail}
              alt="icon"
            />
          </label>
          <label className="formContainer__signUpLabel">
            <div
              className="formContainer__signUpLabel--inputTitle"
              style={{ color: isPasswordValid === false ? "red" : "white" }}
            >
              Password
            </div>
            <input
              className="formContainer__signUpInput"
              placeholder="Your Password..."
              type={isPassVisible ? "" : "password"}
              onClick={handlePassword}
              style={{
                marginBottom: "50px",
                borderColor: isPasswordValid === false ? "red" : "white",
              }}
              onChange={(e) =>
                setAccount({ ...account, password: e.target.value })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") createAccount();
              }}
            />
            <img
              className="formContainer__signUpLabel__passwordIcon"
              src={darkPassword}
              alt="icon"
            />
            <img
              className="formContainer__signUpLabel__eyeIcon"
              src={darkEye}
              alt="icon"
            />
          </label>
          <button
            className="formContainer__signUpButton"
            id={contextTheme}
            style={{ marginBottom: "20px" }}
            onClick={(e) => {
              e.preventDefault();
              createAccount();
            }}
          >
            SIGN UP
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
            className="formContainer__signUpButton"
            id={contextTheme}
          >
            <img
              className="formContainer__signUpButton__googleIcon"
              src={google}
            />
            CONTINUE WITH GOOGLE
          </button>
        </form>
      </div>
    </>
  );
}

export default SignUp;
