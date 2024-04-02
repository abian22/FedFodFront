import "./Chats.scss";
import imagen from "../../assets/images/captura.png";
import { Link } from "react-router-dom";

function Chats() {
  return (
    <div className="chat-container">
      <div className="users">
        <Link to={"/home/chat"}   style={{ textDecoration: "none", color: "inherit" }}>
        <div className="user" style={{ display: "flex", alignItems: "center" }}>
          <img
            src={imagen}
            style={{ height: "40px", display: "flex", flexDirection: "row", borderRadius:"20px" }}
          />
          Usuario 1
        </div>
        </Link>
        <div className="user" style={{ display: "flex", alignItems: "center" }}>
          <img
            src={imagen}
            style={{ height: "40px", display: "flex", flexDirection: "row", borderRadius:"20px" }}
          />
          Usuario 1
        </div>{" "}
        <div className="user" style={{ display: "flex", alignItems: "center" }}>
          <img
            src={imagen}
            style={{ height: "40px", display: "flex", flexDirection: "row", borderRadius:"20px" }}
          />
          Usuario 1
        </div>{" "}
        <div className="user" style={{ display: "flex", alignItems: "center" }}>
          <img
            src={imagen}
            style={{ height: "40px", display: "flex", flexDirection: "row", borderRadius:"20px" }}
          />
          Usuario 1
        </div>{" "}
        <div className="user" style={{ display: "flex", alignItems: "center" }}>
          <img
            src={imagen}
            style={{ height: "40px", display: "flex", flexDirection: "row", borderRadius:"20px" }}
          />
          Usuario 1
        </div>
      </div>
      <div className="chat"></div>
    </div>
  );
}

export default Chats;
