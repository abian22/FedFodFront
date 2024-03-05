import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useThemeContext } from "../../context/ThemeContext";
import { getProfile } from "../../services/user";
import SwitchComponent from "../SwitchComponent/SwitchComponent";
import "./Header.scss";

function Header() {
  const navigate = useNavigate();
  const [isMenuProfileOpen, setIsMenuProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileImg, setProfileImg] = useState("");
  const { contextTheme, setContextTheme } = useThemeContext();
  const [checked, setChecked] = useState(true);
  const [mailNotificationCount, setMailNotificationCount] = useState(0);
  const [notificationNotificationCount, setNotificationNotificationCount] =
    useState(0);

  // Function to simulate receiving a new mail notification
  const receiveMailNotification = () => {
    setMailNotificationCount((count) => count + 1);
  };

  // Function to simulate receiving a new notification
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getProfileImg = async () => {
    const result = await getProfile();
    setProfileImg(result.profileImg);
  };

  const menu = [
    {
      title: "home",
      //darkHomeSvg
      darkPath: (
        <>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
          <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
          <path d="M10 12h4v4h-4z" />
        </>
      ),
      //lightHomeSvg
      lightPath: (
        <>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
          <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
          <path d="M10 12h4v4h-4z" />
        </>
      ),
      fun: () => {
        navigate("/home");
      },
    },
    {
      title: "search",
      //darkSearchSvg
      darkPath: (
        <>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
          <path d="M21 21l-6 -6" />
        </>
      ),
      //lightSearchSvg
      lightPath: (
        <>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
          <path d="M21 21l-6 -6" />
        </>
      ),
      fun: () => {},
    },
    {
      title: "upload",
      //darkUploadSvg
      darkPath: (
        <>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
          <path d="M9 12h6" />
          <path d="M12 9v6" />
        </>
      ),
      //lightUploadSvg
      lightPath: (
        <>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
          <path d="M9 12h6" />
          <path d="M12 9v6" />
        </>
      ),
      fun: () => {
        // navigate("/login");
      },
    },
    {
      title: "notification",
      //darkNotificationSvg
      darkPath: (
        <>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
          <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
          <path d="M21 6.727a11.05 11.05 0 0 0 -2.794 -3.727" />
          <path d="M3 6.727a11.05 11.05 0 0 1 2.792 -3.727" />
        </>
      ),
      //lightNotification
      lightPath: (
        <>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
          <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
          <path d="M21 6.727a11.05 11.05 0 0 0 -2.794 -3.727" />
          <path d="M3 6.727a11.05 11.05 0 0 1 2.792 -3.727" />
        </>
      ),
      fun: () => {
        // navigate("/login");
      },
    },
    {
      title: "mail",
      //darkMail
      darkPath: (
        <>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
          <path d="M3 7l9 6l9 -6" />
        </>
      ),
      //lightMain
      lightPath: (
        <>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
          <path d="M3 7l9 6l9 -6" />
        </>
      ),
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
          {menu.map((option, index) => (
            <li
              style={{ listStyle: "none", marginTop: "10px" }}
              key={index}
              onClick={() => {
                toggleMenu();
                option.fun();
              }}
            >
              <svg
                id={contextTheme}
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 24 24"
                stroke="#ffffff"
              >
                {option.darkPath}
              </svg>

              {option.title === "mail" && mailNotificationCount > 0 && (
                <div className="notification-badge">
                  {mailNotificationCount}
                </div>
              )}

              {option.title === "notification" &&
                notificationNotificationCount > 0 && (
                  <div className="notification-badge">
                    {notificationNotificationCount}
                  </div>
                )}
            </li>
          ))}
          <img
            style={{ height: "30px", width: "30px", borderRadius: "15px" }}
            src={profileImg}
            onClick={toggleMenuProfile}
          />
          <SwitchComponent handleSwitch={handleSwitch} checked={checked} />
        </ul>
      </header>
    </>
  );
}

export default Header;
