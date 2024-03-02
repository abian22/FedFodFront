import "./SignUp.scss";
import { useState } from "react";
import { useThemeContext } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { signUp } from "../../services/auth";
import userIcon from "../../assets/icons/userIcon.svg";
import emailIcon from "../../assets/icons/emailIcon.svg";
import passwordIcon from "../../assets/icons/passwordIcon.svg";
import eyeIcon from "../../assets/icons/eyeIcon.svg";
import SignUpButton from "../../components/SignUpButton/SignUpButton";
import HeaderBeforeLogin from "../../components/HeaderBeforeLogin/HeaderBeforeLogin";
import InputForm from "../../components/InputForm/InputForm";

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
    console.log("funciona")
    console.log(isPassVisible)
    setIsPassVisible(!isPassVisible);
  }

  async function createAccount() {
    const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    console.log("entra en create");
    try {
      if (account.username || account.username.trim() === "") {
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
      navigate("/home");
    } catch (error) {
      console.error("Error:", error);
      alert("Any field is invalid or email already exist");
    }
  }

  return (
    <>
      <HeaderBeforeLogin />
      <div className="signUpContainer ">
        <h2>SignUp</h2>
      </div>
      <div className="container">
        <form className="formContainer">
          <InputForm
            title="Username"
            placeholder="Your Username..."
            isFieldValid={isUsernameValid}
            iconStyle="formContainer__signUpLabel__userIcon"
            icon={userIcon}
            contextId={contextTheme}
            accountData={(value) => setAccount({ ...account, username: value })}
            createAccountFunction={createAccount}
          />
          <InputForm
            title="Email"
            placeholder="Your email..."
            isFieldValid={isEmailValid}
            iconStyle="formContainer__signUpLabel__emailIcon"
            icon={emailIcon}
            contextId={contextTheme}
            accountData={(value) => setAccount({ ...account, email: value })}
            createAccountFunction={createAccount}
          />
          <InputForm
            title="Password"
            placeholder="Your Password..."
            isFieldValid={isPasswordValid}
            iconStyle="formContainer__signUpLabel__passwordIcon"
            icon={passwordIcon}
            contextId={contextTheme}
            accountData={(value) => setAccount({ ...account, password: value })}
            createAccountFunction={createAccount}
            eyeIcon={eyeIcon}
            handlePassword={handlePassword}
            isPassVisible={isPassVisible}
          />
          {/* <label className="formContainer__signUpLabel">
            <div
              className="formContainer__signUpLabel--inputTitle"
              id={contextTheme}
              style={{ color: isUsernameValid === false ? "red" : "" }}
            >
              Username
            </div>
            <input
              className="formContainer__signUpInput"
              placeholder="Your Username..."
              style={{
                borderColor: isUsernameValid === false ? "red" : "black",
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
              src={userIcon}
              alt="icon"
            />
          </label>
          <label className="formContainer__signUpLabel">
            <div
              className="formContainer__signUpLabel--inputTitle"
              style={{ color: isEmailValid === false ? "red" : "" }}
              id={contextTheme}
            >
              Email
            </div>
            <input
              className="formContainer__signUpInput"
              placeholder="Example@gmail.com"
              style={{ borderColor: isEmailValid === false ? "red" : "black" }}
              onChange={(e) =>
                setAccount({ ...account, email: e.target.value })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") createAccount();
              }}
            />
            <img
              className="formContainer__signUpLabel__emailIcon"
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
              style={{
                marginBottom: "50px",
                borderColor: isPasswordValid === false ? "red" : "black",
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
              src={passwordIcon}
              alt="icon"
            />
            <img
              className="formContainer__signUpLabel__eyeIcon"
              src={eyeIcon}
              alt="icon"
            />
          </label>  */}
          <SignUpButton
            onCreateAccount={createAccount}
            style={"formContainer__signUpButton"}
          />

          <GoogleLogin
            theme="filled_black"
            shape="circle"
            width="320"
            text="signup_with"
            onSuccess={async (credentialResponse) => {
              try {
                console.log(credentialResponse);
                var credentialResponseDecoded = jwtDecode(
                  credentialResponse.credential
                );
                const signUpResponse = await signUp({
                  username: credentialResponseDecoded.given_name,
                  email: credentialResponseDecoded.email,
                  password: credentialResponseDecoded.sub,
                });
                localStorage.setItem("token", signUpResponse.data.token);
                console.log(credentialResponseDecoded);
                navigate("/home");
              } catch (error) {
                console.error("Error during Google sign-up:", error);
                alert("This account already exists or an error occurred");
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

export default SignUp;
