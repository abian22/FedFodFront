import api from "./serviceConfig";

async function sendMessage(sender, receiverId, message) {
    try {
      const result = await api.post("/chat/sendMessage", {
        sender: sender,
        receiver: receiverId,
        message: message
      }, {
        headers: {
          token: localStorage.getItem("token"),
        }
      });
      console.log("sendMessage result:", result);
      return result.data;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  }
  
async function getMessages() {

    }


export { sendMessage, getMessages} ;
