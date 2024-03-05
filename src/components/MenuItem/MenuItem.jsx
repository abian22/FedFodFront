import { useThemeContext } from "../../context/ThemeContext";
import { useNavigate } from "react-router";
import "./MenuItem.scss";

const MenuItem = ({
  title,
  path,
  fun,
  mailNotificationCount,
  notificationNotificationCount,
}) => {
  const { contextTheme } = useThemeContext();
  const navigate = useNavigate();
  return (
    <li
      style={{ listStyle: "none", marginTop: "10px", cursor: "pointer" }}
      onClick={() => {
        if (title === "home") {
          navigate(`/${title}`);
        } else navigate(`/home/${title}`);
      }}
    >
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

      {title === "mail" && mailNotificationCount > 0 && (
        <div className="notification-badge">{mailNotificationCount}</div>
      )}

      {title === "notification" && notificationNotificationCount > 0 && (
        <div className="notification-badge">
          {notificationNotificationCount}
        </div>
      )}
    </li>
  );
};

export default MenuItem;
