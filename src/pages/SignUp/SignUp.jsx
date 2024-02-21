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
          <label className="signUpLabel">
            Username
            <input className="signUpInput" />
            <img
              src={darkUser}
              alt="icon"
              style={{
                display: "flex",
                position: "absolute",
                top: "180px",
                width: "20px",
                height: "20px",
                marginLeft: "5px",
                justifyContent: "start",
                alignItems: "start",
                alignContent: "start",
              }}
            />
          </label>
          <label className="signUpLabel">
            Email
            <input className="signUpInput" />
            <img
              src={darkEmail}
              alt="icon"
              style={{
                display: "flex",
                position: "absolute",
                top: "270px",
                width: "20px",
                height: "20px",
                marginLeft: "5px",
                justifyContent: "start",
                alignItems: "start",
                alignContent: "start",
              }}
            />
          </label>
          <label className="signUpLabel">
            Password
            <input className="signUpInput" style={{ marginBottom: "50px" }} />
            <img
              src={darkPassword}
              alt="icon"
              style={{
                display: "flex",
                position: "absolute",
                top: "357px",
                width: "20px",
                height: "20px",
                marginLeft: "5px",
                justifyContent: "start",
                alignItems: "start",
                alignContent: "start",
              }}
            />
          </label>
          <button
            style={{
              width: "92%",
              height: "50px",
              marginBottom: "20px",
              justifyContent: "center",
              fontFamily: "semiBold",
              marginLeft: "10px",
            }}
          >
            SIGN UP
          </button>
          <button
            style={{
              width: "92%",
              height: "50px",
              fontFamily: "semiBold",
              marginLeft: "10px",
            }}
          >
            {" "}
            <img
              src={google}
              style={{
                display: "flex",
                height: "24px",
                position: "absolute",
                marginTop: "-3px",
                marginLeft: "0px",
              }}
            />{" "}
            continue with google
          </button>
        </form>
      </div>
    </>
  );
}

export default SignUp;
