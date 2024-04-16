import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useThemeContext } from "../../context/ThemeContext";
import { getProfile } from "../../services/user";
import SwitchComponent from "../SwitchComponent/SwitchComponent";
import MenuItem from "../MenuItem/MenuItem";
import menuData from "../../../menuData.json";
import LanguageButton from "../LanguageButton/LanguageButton"
import { useTranslation } from "react-i18next";
import "./Header.scss";

function Header() {
  const navigate = useNavigate();
  const [t, i18n] = useTranslation("global");
  const { setContextTheme } = useThemeContext();
  const [isMenuProfileOpen, setIsMenuProfileOpen] = useState(false);
  const [profileImg, setProfileImg] = useState("");
  const [checked, setChecked] = useState(true);



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
      title: t("profileMenu.profile"),
      fun: () => {
        navigate("/home/profile");
      },
    },
    {
      title: t("profileMenu.myAccount"),
      fun: () => {
        navigate("/home/myAccount");
      },
    },
    {
      title: t("profileMenu.logout"),
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
            />
          ))}
          <img
            className="headerContainer__profileImg"
            src={profileImg}
            alt="Profile image"
            onClick={toggleMenuProfile}
          />
          {isMenuProfileOpen && (
            <div className="profileMenuContainer">
              <ul className="profileMenuContainer__profileMenuUl">
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
          <LanguageButton/>
          <SwitchComponent handleSwitch={handleSwitch} checked={checked} />
        </ul>
      </nav>
    </>
  );
}

export default Header;
