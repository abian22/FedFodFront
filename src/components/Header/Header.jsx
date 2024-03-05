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
  const { contextTheme, setContextTheme } = useThemeContext();
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
      title: "LOGOUT",
      fun: () => {
        localStorage.removeItem("token");
        navigate("/");
      },
    },
  ];

  return (
    <>
      <header style={{ borderBottom: "solid" }}>
        <ul
          style={{
            display: "flex",
            margin: "0px",
            padding: "10px",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
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
            style={{
              height: "30px",
              width: "30px",
              borderRadius: "15px",
              cursor: "pointer",
            }}
            src={profileImg}
            onClick={toggleMenuProfile}
          />
          {isMenuProfileOpen && (
            <div
              style={{
                backgroundColor: "grey",
                display: "flex",
                position: "absolute",
                top: "55px",
                right: "24%",
                borderRadius:"10px",
                width:"auto",
              }}
            >
              <ul style={{display:"flex", flexDirection:"column", justifyContent:"center", alignContent:"center", alignItems:"center"}}>
                {settings.map((item, index) => (
                  <li
                    key={index}
                    style={{ listStyle: "none" }}
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
      </header>
    </>
  );
}

export default Header;
