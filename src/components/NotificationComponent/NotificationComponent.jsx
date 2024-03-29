import imagen from "../../assets/images/descarga.png";
import ReactPlayer from "react-player";
import "./NotificationComponent.scss";
import { Link } from "react-router-dom";

function NotificationComponent({
  profileImgOfNotification,
  usernameOfNotification,
  message,
  notificatedMedia,
  mediaId,
  userIdOfNotification,
}) {
  return (
    <div className="notificationContainer">
      <div className="notificationContainer__alignContent">
        <Link to={`/home/${userIdOfNotification}`}>
          <img
            className="notificationContainer__alignContent--profileImg"
            src={profileImgOfNotification}
            alt="Avatar"
          />
        </Link>
        <div>
          <Link
            to={`/home/${userIdOfNotification}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <h2 className="notificationContainer__username">
              {usernameOfNotification}
            </h2>
          </Link>
          <p className="notificationContainer__typeOfNotification">{message}</p>
        </div>
      </div>
      {notificatedMedia &&
        (notificatedMedia.endsWith(".png") ||
        notificatedMedia.endsWith(".jpg") ||
        notificatedMedia.endsWith(".jfif") ? (
          <img
            className="notificationContainer__notificatedMedia"
            src={notificatedMedia}
            alt="Image"
          />
        ) : (
          <Link to={`/home/media/${mediaId}`}>
            <ReactPlayer
              url={notificatedMedia}
              width="80px"
              height="50px"
              controls={false}
            />
          </Link>
        ))}
    </div>
  );
}

export default NotificationComponent;
