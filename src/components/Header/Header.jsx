import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useThemeContext } from "../../context/ThemeContext";
import { getProfile } from "../../services/user";
import SwitchComponent from "../SwitchComponent/SwitchComponent";
import MenuItem from "../MenuItem/MenuItem";
import menuData from "../../../menuData.json";
import "./Header.scss";

function Header() {
  const navigate = useNavigate();
  const { setContextTheme } = useThemeContext();
  const [isMenuProfileOpen, setIsMenuProfileOpen] = useState(false);
  const [profileImg, setProfileImg] = useState("");
  const [checked, setChecked] = useState(true);
  const [mailNotificationCount, setMailNotificationCount] = useState(0);
  const [notificationNotificationCount, setNotificationNotificationCount] =
    useState(0);

  // Prototype of mail notification
  const receiveMailNotification = () => {
    setMailNotificationCount((count) => count + 1);
  };

  // Prototype of new notification
  const receiveNotification = () => {
    setNotificationNotificationCount((count) => count + 1);
  };

  const handleSwitch = (nextChecked) => {
    setContextTheme((state) => (state === "Light" ? "Dark" : "Light"));
    setChecked(nextChecked);
  };

  useEffect(() => {
    getProfileImg();
  }, []);

  const toggleMenuProfile = () => {
    setIsMenuProfileOpen(!isMenuProfileOpen);
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
      title: "MY ACCOUNT",
      fun: () => {
        navigate("/home/myAccount");
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
      <nav className="headerContainer">
        <ul className="headerContainer__menuItemsContainer">
          {menuData.map((item, index) => (
            <MenuItem
              key={index}
              title={item.title}
              path={item.path}
              fun={item.fun}
              mailNotificationCount={mailNotificationCount}
              notificationNotificationCount={notificationNotificationCount}
            />
          ))}
          <img
            className="headerContainer__profileImg"
            src={profileImg}
            onClick={toggleMenuProfile}
          />
          {isMenuProfileOpen && (
            <div
              className="profileMenuContainer"
              >
              <ul
                className="profileMenuContainer__profileMenuUl"
                >
                {settings.map((item, index) => (
                  <li
                  className="profileMenuContainer__profileMenuLi"
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

          <SwitchComponent handleSwitch={handleSwitch} checked={checked} />
        </ul>
      </nav>
    </>
  );
}

export default Header;
