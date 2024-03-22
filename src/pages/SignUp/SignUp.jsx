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
import AccountInfoContainer from "../../components/AccountInfoContainer/AccountInfoContainer";

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
    console.log("funciona");
    console.log(isPassVisible);
    setIsPassVisible(!isPassVisible);
  }

  async function createAccount() {
    const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    console.log("entra en create");
    try {
      if (account.username === "") {
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
      <AccountInfoContainer title="SignUp">
        <InputForm
          title="Username"
          placeholder="Your Username..."
          isFieldValid={isUsernameValid}
          iconStyle="formContainer__signUpLabel__userIcon"
          icon={userIcon}
          contextId={contextTheme}
          accountData={(value) => setAccount({ ...account, username: value })}
          loginOrSignupFunction={createAccount}
        />
        <InputForm
          title="Email"
          placeholder="Your email..."
          isFieldValid={isEmailValid}
          iconStyle="formContainer__signUpLabel__emailIcon"
          icon={emailIcon}
          contextId={contextTheme}
          accountData={(value) => setAccount({ ...account, email: value })}
          loginOrSignupFunction={createAccount}
        />
        <InputForm
          title="Password"
          placeholder="Your Password..."
          isFieldValid={isPasswordValid}
          iconStyle="formContainer__signUpLabel__passwordIcon"
          icon={passwordIcon}
          contextId={contextTheme}
          accountData={(value) => setAccount({ ...account, password: value })}
          loginOrSignupFunction={createAccount}
          eyeIcon={eyeIcon}
          handlePassword={handlePassword}
          isPassVisible={isPassVisible}
          eyeIconStyle="formContainer__signUpLabel__eyeIcon"
        />
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
              var credentialResponseDecoded = jwtDecode(
                credentialResponse.credential
              );
              const signUpResponse = await signUp({
                username: credentialResponseDecoded.given_name,
                email: credentialResponseDecoded.email,
                password: credentialResponseDecoded.sub,
              });
              localStorage.setItem("token", signUpResponse.data.token);
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
      </AccountInfoContainer>
    </>
  );
}

export default SignUp;
