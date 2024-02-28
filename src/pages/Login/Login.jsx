import { jwtDecode } from "jwt-decode";
import { useThemeContext } from "../../context/ThemeContext";
import { useState } from "react";
import darkEmail from "../../assets/icons/darkEmail.svg";
import darkPassword from "../../assets/icons/darkPassword.svg";
import darkEye from "../../assets/icons/darkEye.svg";
// import google from "../../assets/icons/icons8-google.svg";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth";
import { GoogleLogin } from "@react-oauth/google";
import "./Login.scss";
import LoginButton from "../../components/LoginButton/LoginButton";

function Login() {
  const navigate = useNavigate();
  const { contextTheme } = useThemeContext();
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(null);
  const [isPasswordValid, setIsPasswordValid] = useState(null);
  const [loginAccount, setLogginAccount] = useState({
    email: "",
    password: "",
  });

  function handlePassword() {
    setIsPassVisible(!isPassVisible);
  }

  async function logAccount() {
    const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    try {
      if (!emailValidation.test(loginAccount.email)) {
        setIsEmailValid(false);
      } else setIsEmailValid(true);

      if (loginAccount.password.trim() === "") {
        setIsPasswordValid(false);
      } else setIsPasswordValid(true);

      const loginResponse = await login({
        email: loginAccount.email,
        password: loginAccount.password,
      });
      localStorage.setItem("token", loginResponse.data.token);
      navigate("/home");
    } catch (error) {
      console.error("Error:", error);
      alert("Any field is invalid");
    }
  }

  return (
    <>
      <div className="signUpContainer ">
        <h2>Login</h2>
      </div>
      <div className="container">
        <form className="formContainer">
          <label className="formContainer__signUpLabel">
            <div
              className="formContainer__signUpLabel--inputTitle"
              id={contextTheme}
              style={{ color: isEmailValid === false ? "red" : "" }}
            >
              Email
            </div>
            <input
              className="formContainer__signUpInput"
              placeholder="Example@gmail.com"
              style={{ borderColor: isEmailValid === false ? "red" : "black" }}
              onChange={(e) =>
                setLogginAccount({ ...loginAccount, email: e.target.value })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") logAccount();
              }}
            />
            <img
              className="formContainer__loginLabel--emailIcon"
              src={darkEmail}
              alt="icon"
            />
          </label>
          <label className="formContainer__signUpLabel">
            <div
              className="formContainer__signUpLabel--inputTitle"
              id={contextTheme}
              style={{ color: isPasswordValid === false ? "red" : "" }}
            >
              Password
            </div>
            <input
              className="formContainer__signUpInput"
              placeholder="Your Password..."
              type={isPassVisible ? "" : "password"}
              onClick={handlePassword}
              onChange={(e) =>
                setLogginAccount({ ...loginAccount, password: e.target.value })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") logAccount();
              }}
              style={{
                marginBottom: "50px",
                borderColor: isEmailValid === false ? "red" : "black",
              }}
            />
            <img
              className="formContainer__loginLabel--passwordIcon"
              src={darkPassword}
              alt="icon"
            />
            <img
              className="formContainer__loginLabel--eyeIcon"
              src={darkEye}
              alt="icon"
            />
          </label>
          <LoginButton onLogin={logAccount} style={"formContainer__signUpButton"}/>
          {/* <button
            className="formContainer__signUpButton"
            id={contextTheme}
            style={{ marginBottom: "20px" }}
            onClick={(e) => {
              e.preventDefault();
              logAccount();
            }}
          >
            LOGIN
          </button> */}
          <GoogleLogin
            theme="filled_black"
            shape="circle"
            width="320"
            text="signin_with"
            className="formContainer__signUpButton"
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
              var credentialResponseDecoded = jwtDecode(
                credentialResponse.credential
              );
              console.log(credentialResponseDecoded);
              navigate("/home");
            }}
            onError={() => {
              alert("Error login failed");
            }}
          />
          {/* <button
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
            LOGIN WITH GOOGLE
          </button> */}
        </form>
      </div>
    </>
  );
}

export default Login;
