import imagen from "../../assets/images/captura.png";
import "./Chat.scss";
import { sendMessage } from "../../services/chat";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getProfile } from "../../services/user";

const Chat = () => {
  const { receiverId } = useParams();
  const [senderId, setSenderId] = useState();
  const [message, setMessage] = useState(""); // Estado para almacenar el mensaje

  async function getMyId() {
    const result = await getProfile();
    setSenderId(result._id);
  }
  
  async function handleMessage() {
    try {
      await sendMessage(senderId, receiverId, message); 
      console.log("Mensaje enviado con éxito");
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  }
  console.log(senderId)


  useEffect(() => {
    getMyId();
  }, []);

  return (
    <>
      <header className="centerContainer">
        <div className="userContainer">
          <img
            className="userContainer__profileImg"
            src={imagen}
            alt="Avatar del usuario"
          />
          <span className="userContainer__username">Usuario</span>
        </div>
      </header>
      <main className="centerContainer">
        <div className="chatContainer">
          <div className="chatContainer__chat">
            <div className="chatContainer__chat--messageFromUser">
              <span>Mensaje de la otra persona</span>
              <span className="chatContainer__chat--timestamp">10:00 AM</span>
            </div>
            <div className="chatContainer__chat--myMessage">
              <span>Mi mensaje</span>
              <span className="chatContainer__chat--timestamp">10:05 AM</span>
            </div>
            <div className="chatContainer__chat--messageFromUser">
              <span>Otro mensaje de la otra persona</span>
              <span className="chatContainer__chat--timestamp">10:10 AM</span>
            </div>
          </div>
        </div>
      </main>
      <footer className="centerContainer">
        <form className="messageInputContainer">
          <input
            className="messageInputContainer__messageInput"
            type="text"
            id="mensaje"
            name="mensaje"
            placeholder="Write your message..."
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
          />
          <button
            className="messageInputContainer__sendButton"
            type="button"
            style={{
              padding: "11.2px",
              borderRadius: "5px",
              border: "none",
              borderTopLeftRadius: "0px",
              borderBottomLeftRadius: "0px",
              backgroundColor: "#007bff",
              color: "white",
              cursor: "pointer",
            }}
            onClick={handleMessage}
          >
            Enviar
          </button>
        </form>
      </footer>
    </>
  );
};

export default Chat;
