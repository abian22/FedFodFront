import imagen from "../../assets/images/descarga.png";
import "./NotificationComponent.scss";

function NotificationComponent({ profileImg, username, type, notificatedMedia}) {
  return (
    <div className="notificationContainer">
      <div className="notificationContainer__alignContent">
        <img
          className="notificationContainer__alignContent--profileImg"
          src={imagen}
          alt="Avatar"
        />
        <div>
          <h2 className="notificationContainer__username">usuario</h2>
          <p className="notificationContainer__typeOfNotification">
            ha comentado tu post
          </p>
        </div>
      </div>
      <img
        className="notificationContainer__notificatedMedia"
        src={imagen}
        alt="Comentario de usuario"
      />
    </div>
  );
}

export default NotificationComponent;
