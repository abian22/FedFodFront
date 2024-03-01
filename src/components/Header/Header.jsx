import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProfile } from "../../services/user";
import "./Header.scss";

function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [profileImg, setProfileImg] = useState("");

  useEffect(() => {
    getProfileImg();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const getProfileImg = async () => {
    const result = await getProfile();
    setProfileImg(result.profileImg);
  };

  const settings = [
    {
      title: "PROFILE",
      fun: () => {
        navigate("/home/profile");
      },
    },
    {
      title: "LOGOUT",
      fun: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
    },
  ];

  return (
    <>
      <div className="headerContainer">
        <img
          className="headerContainer__profileImg"
          src={profileImg}
          onClick={toggleMenu}
        />
      </div>
      {isMenuOpen && (
        <div className="headerContainer__profilePannel">
          <ul className="headerContainer__profilePannel--profileOptions">
            {settings.map((item, index) => (
              <li
                className="headerContainer__profilePannel--profileOption"
                key={index}
                onClick={() => {
                  toggleMenu();
                  item.fun();
                }}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Header;
