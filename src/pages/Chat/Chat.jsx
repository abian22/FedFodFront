import { useState, useEffect, useRef } from "react";
import imagen from "../../assets/images/captura.png";
import "./Chat.scss";
import { sendMessage, getMessages } from "../../services/chat";
import { useParams } from "react-router";
import { getProfile } from "../../services/user";

const Chat = () => {
  const { receiverId } = useParams();
  const [senderId, setSenderId] = useState();
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const chatContainerRef = useRef(null);

  async function getMyId() {
    const result = await getProfile();
    setSenderId(result._id);
  }

  async function handleMessage() {
    try {
      await sendMessage(senderId, receiverId, message);
      console.log("Mensaje enviado con éxito");
      getChatMessages();
      setMessage(""); 
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  }

  async function getChatMessages() {
    const result = await getMessages(receiverId);
    setAllMessages(result);
  }

  console.log("mensajes", allMessages.map((m) => m));

  useEffect(() => {
    getMyId();
    getChatMessages();
  }, []);
  useEffect(() => {
    if (chatContainerRef.current) {
      setTimeout(() => {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }, 0);
    }
  }, [allMessages]);

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
        <div
          className="chatContainer"
          ref={chatContainerRef} 
        >
          <div className="chatContainer__chat">
            {allMessages.map((m, index) => (
              <div key={index}>
                {m.sender === senderId ? (
                  <div className="chatContainer__chat--myMessage">
                    <span>{m.message}</span>
                    <span className="chatContainer__chat--timestamp">
                      {m.createdAt.slice(11, 16)}
                    </span>
                  </div>
                ) : (
                  <div className="chatContainer__chat--messageFromUser">
                    <span>{m.message}</span>
                    <span className="chatContainer__chat--timestamp">
                      {m.createdAt.slice(11, 16)}
                    </span>
                  </div>
                )}
              </div>
            ))}
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
            autoComplete="off" 
            onKeyDown={(e) => {

              if (e.key === "Enter") {
                e.preventDefault(); 
                handleMessage();
              }
            }}
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
            Send
          </button>
        </form>
      </footer>
    </>
  );
};

export default Chat;
