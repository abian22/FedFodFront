import imagen from "../../assets/images/captura.png";
import "./Chat.scss"; // Estilos CSS

const Chat = () => {
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
          />
          <button
            className="messageInputContainer__sendButton"
            type="submit"
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
          >
            Enviar
          </button>
        </form>
      </footer>
    </>
  );
};

export default Chat;
