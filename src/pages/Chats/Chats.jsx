import "./Chats.scss";
import imagen from "../../assets/images/captura.png";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../services/user";
import { useState, useEffect } from "react";

function Chats() {
  
  const [allUsersData, setAllUsersData] = useState([]);

  useEffect(() => {
    getAllUsersInfo();
  }, []);

  async function getAllUsersInfo() {
    const result = await getAllUsers();
    setAllUsersData(result);
  }

  console.log(allUsersData);

  return (
    <div className="chat-container">
      <div className="users">
        {allUsersData.map((u, index) => (
          <Link
            to={`/home/chats/${u._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
            key={index} 
          >
            <div
              className="user"
              style={{ display: "flex", alignItems: "center" }}
            >
              <img
                src={u.profileImg}
                alt="Profile"
                style={{
                  height: "40px",
                  display: "flex",
                  flexDirection: "row",
                  borderRadius: "20px",
                }}
              />
              <span style={{marginLeft:"20px"}}>
              {u.username}
                </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Chats;
