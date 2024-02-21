import "./SignUp.scss";
import google from "../../assets/icons/icons8-google.svg";
import darkUser from "../../assets/icons/darkUser.svg";
import darkEmail from "../../assets/icons/darkEmail.svg";
import darkPassword from "../../assets/icons/darkPassword.svg";
function SignUp() {
  return (
    <>
      <div className="signUpContainer ">
        <h2>SignUp</h2>
      </div>
      <div className="container">
        <form className="formContainer">
          <label className="formContainer__signUpLabel">
            Username
            <input className="formContainer__signUpInput" />
            <img
              className="formContainer__signUpLabel__userIcon"
              src={darkUser}
              alt="icon"
            />
          </label>
          <label className="formContainer__signUpLabel">
            Email
            <input className="formContainer__signUpInput" />
            <img
              className="formContainer__signUpLabel__emailIcon"
              src={darkEmail}
              alt="icon"
            />
          </label>
          <label className="formContainer__signUpLabel">
            Password
            <input
              className="formContainer__signUpInput"
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
            style={{ marginBottom: "20px" }}
          >
            SIGN UP
          </button>
          <button className="formContainer__signUpButton">
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
