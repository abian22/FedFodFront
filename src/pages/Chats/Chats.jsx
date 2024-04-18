import "./Chats.scss";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../services/user";
import { useState, useEffect } from "react";
import { getProfile } from "../../services/user";

function Chats() {
  const [allUsersData, setAllUsersData] = useState([]);
  const [myId, setMyId] = useState();

  useEffect(() => {
    getAllUsersInfo();
    getMyId();
  }, []);

  async function getMyId() {
    const result = await getProfile();
    setMyId(result._id);
  }

  async function getAllUsersInfo() {
    const result = await getAllUsers();
    setAllUsersData(result);
  }

  return (
    <div className="chatsContainer">
      <div className="chatsContainer__users">
        {allUsersData.map(
          (u, index) =>
            u._id !== myId && (
              <Link
                to={`/home/chats/${u._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
                key={index}
              >
                <div className="chatsContainer__user">
                  <img
                    className="chatsContainer__user--profileImg"
                    src={u.profileImg}
                    alt="Profile"
                  />
                  <span className="chatsContainer__user--username">
                    {u.username}
                  </span>
                </div>
              </Link>
            )
        )}
      </div>
    </div>
  );
}

export default Chats;
