import { useThemeContext } from "../../context/ThemeContext";
import { useNavigate } from "react-router";
import {
  getNotifications,
  readNotifications,
} from "../../services/notification";
import { getProfile } from "../../services/user";
import { useState, useEffect } from "react";
import "./MenuItem.scss";

function MenuItem({ title, path }) {
  const { contextTheme } = useThemeContext();
  const navigate = useNavigate();
  const [getUnreadNotifications, setGetUnreadNotifications] = useState(0);
  const [userLoggedData, setUserLoggedData] = useState([]);

  useEffect(() => {
    getReadNotifications();
    getUserLoggedData();
  }, []);

  async function getReadNotifications() {
    const result = await getNotifications();
    const unread = result.notifications.filter(
      (notification) => notification.unread
    );
    setGetUnreadNotifications(unread);
  }

  async function getUserLoggedData() {
    const result = await getProfile();
    setUserLoggedData(result);
  }

  async function updateUnreadNotifications() {
    try {
      await readNotifications(); 
      const unreadNotifications = await getReadNotifications(); 
      setGetUnreadNotifications(unreadNotifications); 
    } catch (error) {
      console.error("Error updating unread notifications:", error);
    }
  }

  return (
    <li
      className="menuItem"
      onClick={() => {
        if (title === "home") {
          navigate(`/${title}`);
        } else navigate(`/home/${title}`);
        if (title === "notification") {
          updateUnreadNotifications();
        }
      }}
    >
      {title === "notification" &&
        getUnreadNotifications &&
        getUnreadNotifications.length > 0 && (
          <div className="menuItem__notification-badge">
            {getUnreadNotifications.length}
          </div>
        )}
      <svg
        id={contextTheme}
        width="25"
        height="25"
        viewBox="0 0 24 24"
        stroke="#ffffff"
      >
        {path.map((path, index) => (
          <path key={index} {...path} />
        ))}
      </svg>
    </li>
  );
}

export default MenuItem;
