import "./SignUp.scss";
import { useThemeContext } from "../../context/ThemeContext";
import google from "../../assets/icons/icons8-google.svg";
import darkUser from "../../assets/icons/darkUser.svg";
import darkEmail from "../../assets/icons/darkEmail.svg";
import darkPassword from "../../assets/icons/darkPassword.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signUp } from "../../services/auth";

function SignUp() {
  const navigate = useNavigate();
  const { contextTheme } = useThemeContext();
  const [account, setAccount] = useState({
    username: "",
    email: "",
    password: "",
  });

  async function createAccount() {
    try {
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
            <div className="formContainer__signUpLabel--inputTitle">
              Username
            </div>
            <input
              className="formContainer__signUpInput"
              placeholder="Your Username..."
              onChange={(e) =>
                setAccount({ ...account, username: e.target.value })
              }
            />
            <img
              className="formContainer__signUpLabel__userIcon"
              src={darkUser}
              alt="icon"
            />
          </label>
          <label className="formContainer__signUpLabel">
            <div className="formContainer__signUpLabel--inputTitle">Email</div>
            <input
              className="formContainer__signUpInput"
              placeholder="Your Email..."
              onChange={(e) =>
                setAccount({ ...account, email: e.target.value })
              }
            />
            <img
              className="formContainer__signUpLabel__emailIcon"
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
              onChange={(e) =>
                setAccount({ ...account, password: e.target.value })
              }
              style={{ marginBottom: "50px" }}
            />
            <img
              className="formContainer__signUpLabel__passwordIcon"
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
