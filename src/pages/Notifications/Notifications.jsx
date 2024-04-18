import NotificationComponent from "../../components/NotificationComponent/NotificationComponent";
import { useState, useEffect } from "react";
import { getNotifications } from "../../services/notification";
import { getUserInfo } from "../../services/user";
import { getSingleMedia } from "../../services/media";
import Loader from "../../components/Loader/Loader"; 

function Notifications() {
  const [notificationData, setNotificationData] = useState([]);
  const [loading, setLoading] = useState(true); 

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
      setLoading(false); 
    } catch (error) {
      console.error("Error obtaining notifications", error);
      setLoading(false); 
    }
  }

  return (
    <>
      {loading ? ( 
        <Loader />
      ) : (
        notificationData.map((n, index) => (
          <NotificationComponent
            key={index}
            usernameOfNotification={n.username}
            profileImgOfNotification={n.profileImg}
            message={n.message}
            notificatedMedia={n.mediaUrl.mediaUrl}
            mediaId={n.associatedItemId}
            userIdOfNotification={n.actionUserId}
          />
        ))
      )}
    </>
  );
}

export default Notifications;
