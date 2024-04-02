import imagen from "../../assets/images/descarga.png";
import "./Chat.scss"; // Estilos CSS

const Chat = () => {
  return (
    <>
      <div className="centerContainer">
        <div
          style={{
            margin: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img src={imagen} style={{ height: "30px", borderRadius: "20px" }} />
          <span style={{ marginLeft: "10px" }}>usuario</span>
        </div>
      </div>
      <div className="centerContainer">
        <div className="chat-container" style={{ border: "solid" }}>
          <div className="chat">
            <div className="message other">
              <span>Mensaje de la otra persona</span>
              <span className="timestamp">10:00 AM</span>
            </div>
            <div className="message own">
              <span>Mi mensaje</span>
              <span className="timestamp">10:05 AM</span>
            </div>
            <div className="message other">
              <span>Otro mensaje de la otra persona</span>
              <span className="timestamp">10:10 AM</span>
            </div>
          </div>
        </div>
      </div>
      <div className="centerContainer">
  
          <input
            className="messageInput"
            type="text"
            placeholder="Escribe tu mensaje..."
            style={{
              padding: "10px",
              borderRadius: "5px",
              borderTopRightRadius: "0px",
              borderBottomRightRadius: "0px",
              border: "1px solid #ccc",
              marginRight: "0px",
            }}
          />
          <button
            style={{
              padding: "11px",
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
        </div>

    </>
  );
};

export default Chat;
