import api from "./serviceConfig";

async function sendNotification(notification) {
  try {
    const response = await api.post(`/notification`, notification, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al toggle likes:", error);
    throw error;
  }
}

async function getNotifications() {
  try {
    const response = await api.get(`/notification`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al toggle likes:", error);
    throw error;
  }
}

export { sendNotification, getNotifications };
