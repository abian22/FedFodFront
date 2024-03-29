import NotificationComponent from "../../components/NotificationComponent/NotificationComponent";
import { useState, useEffect } from "react";
import { getNotifications } from "../../services/notification";
import { getUserInfo } from "../../services/user";
import { getSingleMedia } from "../../services/media";

function Notifications() {
  const [notificationData, setNotificationData] = useState([]);

  useEffect(() => {
    getNotificationInfo();
  }, []);

  async function getNotificationInfo() {
    try {
      const notifications = await getNotifications();
      const processedNotifications = await Promise.all(
        notifications.notifications.map(async (notification) => {
          const userProfile = await getUserInfo(notification.actionUserId);
          const { username, profileImg } = userProfile;

          const mediaUrl = await getSingleMedia(notification.associatedItemId);

          return {
            username,
            profileImg,
            mediaUrl,
            ...notification,
          };
        })
      );

      setNotificationData(processedNotifications);
    } catch (error) {
      console.error("Error al obtener y procesar notificaciones:", error);
    }
  }


  console.log(notificationData);
  return (
    <>
      {notificationData.map((n, index) => (
        <NotificationComponent
          key={index}
          usernameOfNotification={n.username}
          profileImgOfNotification={n.profileImg}
          message={n.message}
          notificatedMedia={n.mediaUrl.mediaUrl}
          mediaId={n.associatedItemId}
          userIdOfNotification={n.actionUserId}
        />
      ))}
    </>
  );
}

export default Notifications;
