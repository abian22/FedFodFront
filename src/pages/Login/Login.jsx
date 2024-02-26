import { useThemeContext } from "../../context/ThemeContext";
import { useState } from "react";
import darkEmail from "../../assets/icons/darkEmail.svg";
import darkPassword from "../../assets/icons/darkPassword.svg";
import google from "../../assets/icons/icons8-google.svg";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth";
import "./Login.scss";

function Login() {
  const { contextTheme } = useThemeContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function logAccount() {
    try {
      const loginResponse = await login({
        email,
        password,
      });
      console.log("signUp service response:", loginResponse);
      localStorage.setItem("token", loginResponse.data.token);
      navigate("/");
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
            <div className="formContainer__signUpLabel--inputTitle">Email</div>
            <input
              className="formContainer__signUpInput"
              placeholder="Your email..."
              onChange={(e) => setEmail(e.target.value)}
            />
            <img
              className="formContainer__loginLabel--emailIcon"
              src={darkEmail}
              alt="icon"
            />
          </label>
          <label className="formContainer__signUpLabel">
            <div className="formContainer__signUpLabel--inputTitle">
              Password
            </div>
            <input
              className="formContainer__signUpInput"
              placeholder="Your Password..."
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginBottom: "50px" }}
            />
            <img
              className="formContainer__loginLabel--passwordIcon"
              src={darkPassword}
              alt="icon"
            />
          </label>
          <button
            className="formContainer__signUpButton"
            id={contextTheme}
            style={{ marginBottom: "20px" }}
            onClick={(e) => {
              e.preventDefault();
              logAccount();
            }}
          >
            LOGIN
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
            LOGIN WITH GOOGLE
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
