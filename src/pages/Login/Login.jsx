import { useState } from "react";
import { useThemeContext } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import { login } from "../../services/auth";
import emailIcon from "../../assets/icons/emailIcon.svg";
import passwordIcon from "../../assets/icons/passwordIcon.svg";
import eyeIcon from "../../assets/icons/eyeIcon.svg";
import InputForm from "../../components/InputForm/InputForm";
import LoginButton from "../../components/LoginButton/LoginButton";
import HeaderBeforeLogin from "../../components/HeaderBeforeLogin/HeaderBeforeLogin";
import "./Login.scss";

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
      <HeaderBeforeLogin />
      <div className="signUpContainer">
        <h2>Login</h2>
      </div>
      <div className="container">
        <form className="formContainer">
        <InputForm
            title="Email"
            placeholder="Your Email..."
            isFieldValid={isEmailValid}
            iconStyle="formContainer__loginLabel--emailIcon"
            icon={emailIcon}
            contextId={contextTheme}
            accountData={(value) => setLogginAccount({...loginAccount , email: value })}
            loginOrSignupFunction={logAccount}
          />
          <InputForm
            title="Password"
            placeholder="Your Password..."
            isFieldValid={isPasswordValid}
            iconStyle="formContainer__loginLabel--passwordIcon"
            icon={passwordIcon}
            contextId={contextTheme}
            accountData={(value) => setLogginAccount({...loginAccount, password: value })}
            loginOrSignupFunction={logAccount}
            handlePassword={handlePassword}
            eyeIcon={eyeIcon}
            isPassVisible={isPassVisible}
            eyeIconStyle="formContainer__loginLabel--eyeIcon"
          />
          {/* <label className="formContainer__signUpLabel">
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
              src={emailIcon}
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
              src={passwordIcon}
              alt="icon"
            />
            <img
              className="formContainer__loginLabel--eyeIcon"
              src={eyeIcon}
              alt="icon"
            />
          </label> */}
          <LoginButton
            onLogin={logAccount}
            style={"formContainer__signUpButton"}
          />
          <GoogleLogin
            theme="filled_black"
            shape="circle"
            width="320"
            text="signin_with"
            className="formContainer__signUpButton"
            onSuccess={async (credentialResponse) => {
              try {
                console.log(credentialResponse);
                var credentialResponseDecoded = jwtDecode(
                  credentialResponse.credential
                );
                const signUpResponse = await login({
                  email: credentialResponseDecoded.email,
                  password: credentialResponseDecoded.sub,
                });
                localStorage.setItem("token", signUpResponse.data.token);
                console.log(credentialResponseDecoded);
                navigate("/home");
              } catch (error) {
                console.error("Error during Google login:", error);
                alert("Error during Google login");
              }
            }}
            onError={() => {
              alert("Error during Google sign-up");
            }}
          />
        </form>
      </div>
    </>
  );
}

export default Login;
