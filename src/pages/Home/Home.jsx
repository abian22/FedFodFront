import imagen from "../../assets/images/descarga.png";
import lightHeart from "../../assets/icons/lightHeart.svg";
import lightComment from "../../assets/icons/lightComment.svg";
import darkComment from "../../assets/icons/darkComment.svg";
import darkHeart from "../../assets/icons/darkHeart.svg";
import ReactPlayer from "react-player";
import { useThemeContext } from "../../context/ThemeContext";
import { useState, useEffect } from "react";
import "./Home.scss";

function Home() {
  const { contextTheme } = useThemeContext();
  const [videoHeight, setVideoHeight] = useState(300);

  const handleResize = () => {
    const newHeight = window.innerWidth < 900 ? 300 : 400;
    setVideoHeight(newHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <center className="homeCenter">
        <section className="userDataContainer">
          <img className="userDataContainer__profileImg" src={imagen} />
          <div className="userDataContainer__usernameContainer">
            <span className="userDataContainer__usernameContainer--username">
              Nombre de la persona
            </span>
          </div>
        </section>
        <div className="descriptionContainer">
          <span className="descriptionContainer__description">
            Esta es la descripción de la persona persona persona personape
            rsonaper sona. sonaper sona.sonaper sona.sonaper sona.sonaper sona.
            sonaper sona.sonaper sona.sonaper sona. sonaper sona.sonaper
            sona.sonaper sona.sonaper sona.sonaper sona.sonaper sona.sonaper
            sona.
          </span>
        </div>
        <main className="videoAndInteractionContainer">
          <div style={{ border: "solid" }} id={contextTheme}>
            {" "}
            {/* no se si dejar este borde o no */}
            <ReactPlayer
              url={"https://www.youtube.com/watch?v=pLBuFxMYkx8"}
              width="auto"
              height={videoHeight}
              controls={true}
            />
          </div>
          <div
            className="videoAndInteractionContainer__interactionContainer"
            style={{ display: "flex" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={contextTheme === "Light" ? darkHeart : lightHeart}
                style={{ cursor: "pointer" }}
              />
              <span style={{ marginTop: "10px" }}>0</span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={contextTheme === "Light" ? darkComment : lightComment}
                style={{ cursor: "pointer" }}
              />
              <span style={{ marginTop: "10px" }}>0</span>
            </div>
          </div>
        </main>
      </center>
    </>
  );
}

export default Home;
