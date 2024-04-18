import api from "./serviceConfig";

async function sendMessage(sender, receiverId, message) {
  try {
    const result = await api.post(
      "/chat/sendMessage",
      {
        sender: sender,
        receiver: receiverId,
        message: message,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    return result.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
}

async function getMessages(receiverId) {
  try {
    const result = await api.get(`/chat/${receiverId}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return result.data;
  } catch (error) {
    console.error("Error getting message:", error);
    throw error;
  }
}

export { sendMessage, getMessages };
