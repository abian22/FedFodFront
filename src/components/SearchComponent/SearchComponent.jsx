import { useState } from "react";
import { searchUser } from "../../services/user";
import close from "../../assets/icons/darkCancelIcon.svg";
import "./SearchComponent.scss";
import { Link } from "react-router-dom";
function Search() {
  const [searchUsername, setSearchUsername] = useState("");
  const [users, setUsers] = useState([]);

  async function handleSearchUser() {
    try {
      const result = await searchUser(searchUsername);
      setUsers(result);
    } catch (error) {
      console.error(error);
    }
  }

  const handleChange = (event) => {
    setSearchUsername(event.target.value);
    if (event.target.value.trim() !== "") {
      handleSearchUser();
    } else {
      setUsers([]);
    }
  };

  function resetResults() {
    setSearchUsername("");
    setUsers([]);
  }

  return (
    <>
      <div className="centerContainer">
        <div className="searchInputContainer">
          <input
            className="searchInput"
            placeholder="Type to search..."
            value={searchUsername}
            onChange={handleChange}
          />
        </div>
        {users && (
          <div className="searchResultContainer">
            {users.length > 0 && (
              <img
                src={close}
                className="searchResultContainer__closeIcon"
                alt="Close icon"
                onClick={resetResults}
              />
            )}
            <ul className="searchResult">
              {" "}
              {users.map((u, index) => (
                <>
                  <Link to={u._id} style={{ textDecoration: "none" }}>
                    <li className="searchResult__userContainer" key={index}>
                      <div>
                        <img
                          className="searchResult__userContainer--profileImg"
                          alt="Profile image"
                          src={u.profileImg}
                        />
                        <span className="searchResult__userContainer--username">
                          {u.username}
                        </span>
                      </div>
                    </li>
                  </Link>
                </>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default Search;
