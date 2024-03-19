import imagen from "../../assets/images/descarga.png";
import darkCancel from "../../assets/icons/darkCancelIcon.svg";
import lightHeart from "../../assets/icons/lightHeart.svg";
import darkHeart from "../../assets/icons/darkHeart.svg";
import lightCancel from "../../assets/icons/lightCancel.svg";
import { useThemeContext } from "../../context/ThemeContext";

function Notifications() {
  const { contextTheme } = useThemeContext();

  return (
    <>
      <div
        className="centerContainer"
        style={{ marginTop: "20px", height: "450px" }}
      >
        <img src={imagen} />
      </div>
      <div className="centerContainer">
        <div
          style={{
            border: "solid",
            borderColor: "white",
            height: "auto",
            backgroundColor: "grey",
            marginTop: "10px",
            padding: "10px",
            width: "80%",
            maxWidth: "500px",
          }}
        >
          <input
            placeholder="Your comment..."
            style={{ width: "80%", height: "20px", maxWidth: "400px" }}
          />
          <button style={{ marginLeft: "10px" }}> Send </button>
        </div>
      </div>
      <div className="centerContainer" style={{ marginTop: "10px" }}>
        <div
          style={{
            border: "solid",
            width: "80%",
            maxWidth: "520px",
            marginTop: "10px",
            padding: "10px",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              flex: 1,
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={imagen}
                style={{
                  height: "40px",
                  width: "40px",
                  borderRadius: "20px",
                  marginRight: "10px",
                }}
              />
              <span>nombre del usuario</span>
            </div>
            <p style={{ marginLeft: "50px", paddingBottom: "10px" }}>
              texto del comentario comentario comentario
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginLeft: "50px",
              }}
            >
              <img
                src={contextTheme === "Light" ? darkHeart : lightHeart}
                style={{ cursor: "pointer", height: "20px" }}
              />
              <span style={{ marginLeft: "5px" }}>0</span>
            </div>
          </div>
          <img
            src={contextTheme === "Light" ? darkCancel : lightCancel}
            style={{ height: "20px", width: "20px", cursor:"pointer" }}
          />
        </div>
      </div>
    </>
  );
}

export default Notifications;
