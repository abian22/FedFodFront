import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useThemeContext } from "../../context/ThemeContext";
import { getProfile } from "../../services/user";
import darkMenu from "../../assets/icons/darkMenu.svg";
import lightMenu from "../../assets/icons/lightMenu.svg";
import searchIcon from "../../assets/icons/search.svg";
import "./Header.scss";

function Header() {
  const navigate = useNavigate();
  const { contextTheme } = useThemeContext();
  const [isMenuProfileOpen, setIsMenuProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileImg, setProfileImg] = useState("");

  useEffect(() => {
    getProfileImg();
  }, []);

  const toggleMenuProfile = () => {
    setIsMenuProfileOpen(!isMenuProfileOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getProfileImg = async () => {
    const result = await getProfile();
    setProfileImg(result.profileImg);
  };

  const menu = [
    {
      title: "HOME",
      fun: () => {
        navigate("/home");
      },
    },
    {
      title: "UPLOAD",
      fun: () => {
        // navigate("/login");
      },
    },
    {
      title: "CHAT",
      fun: () => {
        // navigate("/login");
      },
    },
  ];

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
        navigate("/");
      },
    },
  ];

  return (
    <>
      <div className="headerContainer">
        <img
          id={contextTheme}
          className="headerContainer__menuIcon"
          src={contextTheme === "Light" ? darkMenu : lightMenu}
          onClick={toggleMenu}
        />
        {isMenuOpen && (
          <div className="menuContainer">
            <ul className="menuContainer__menuUl">
              {menu.map((option, index) => (
                <li
                  className="menuContainer__menuUl--menuLi"
                  key={index}
                  onClick={() => {
                    toggleMenu();
                    option.fun();
                  }}
                >
                  {option.title}
                </li>
              ))}
              <input
                className="menuContainer__menuUl--searchInput"
                placeholder="Buscar..."
              />
              <img
                className="menuContainer__menuUl--searchIcon"
                src={searchIcon}
              />
            </ul>
          </div>
        )}
        <div className="headerContainer__screenMenu">
          <ul
            style={{
              display: "flex",
              position: "absolute",
              top: "-8px",
              right: "150px",
            }}
          >
            {menu.map((option, index) => (
              <li
                className="menuContainer__menuUl--menuLi"
                style={{ marginRight: "10px", listStyle: "none" }}
                key={index}
                onClick={() => {
                  option.fun();
                }}
              >
                {option.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="headerContainer__profileContainer">
          <img
            className="headerContainer__profileImg"
            src={profileImg}
            onClick={toggleMenuProfile}
          />
          {isMenuProfileOpen && (
            <div className="headerContainer__profilePannel">
              <ul className="headerContainer__profilePannel--profileOptions">
                {settings.map((item, index) => (
                  <li
                    className="headerContainer__profilePannel--profileOption"
                    key={index}
                    onClick={() => {
                      toggleMenuProfile();
                      item.fun();
                    }}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
