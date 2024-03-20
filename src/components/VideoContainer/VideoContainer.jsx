import { useThemeContext } from "../../context/ThemeContext";
import { useState, useEffect } from "react";
import { myLike } from "../../services/media";
import lightHeart from "../../assets/icons/lightHeart.svg";
import lightComment from "../../assets/icons/lightComment.svg";
import darkComment from "../../assets/icons/darkComment.svg";
import darkHeart from "../../assets/icons/darkHeart.svg";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import "./VideoContainer.scss";

function VideoContainer({
  name,
  description,
  profileImg,
  url,
  likes,
  uploaded,
  mediaId,
  uploadedBy,
}) {
  const { contextTheme } = useThemeContext();
  const [videoHeight, setVideoHeight] = useState(300);
  const [like, setLike] = useState(likes);

  async function handleLike() {
    try {
      const result = await myLike(mediaId);
      setLike(result.likes.length);
    } catch (error) {
      console.error("Error liking media", error);
    }
  }
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
          <img className="userDataContainer__profileImg" src={profileImg} />
          <div className="userDataContainer__usernameContainer">
            <Link
              to={`/home/${uploadedBy}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <span className="userDataContainer__usernameContainer--username">
                {name}{" "}
              </span>
            </Link>
          </div>
        </section>
        <div className="descriptionContainer">
          <span className="descriptionContainer__description">
            {description}
          </span>
        </div>
        <main className="videoAndInteractionContainer">
          <div style={{ border: "solid" }} id={contextTheme}>
            {" "}
            {/* no se si dejar este borde o no */}
            {url &&
            (url.endsWith(".png") ||
              url.endsWith(".jpg") ||
              url.endsWith(".jfif")) ? (
              <img src={url} style={{ width: "100%" }} alt="Imagen" />
            ) : (
              <ReactPlayer
                url={url}
                width="100%"
                height={videoHeight}
                controls={true}
              />
            )}
          </div>
          <span style={{ display: "flex", marginTop: "10px" }}>
            Uploaded: {uploaded}
          </span>
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
                onClick={handleLike}
              />
              <span style={{ marginTop: "10px" }}>{like}</span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Link
                to={`/home/media/${mediaId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  src={contextTheme === "Light" ? darkComment : lightComment}
                  style={{ cursor: "pointer" }}
                />
              </Link>
              <span style={{ marginTop: "10px" }}>0</span>
            </div>
          </div>
        </main>
      </center>
    </>
  );
}

export default VideoContainer;
