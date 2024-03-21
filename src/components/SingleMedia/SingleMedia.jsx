import lightHeart from "../../assets/icons/lightHeart.svg";
import darkHeart from "../../assets/icons/darkHeart.svg";
import likedHeart from "../../assets/icons/likedHeart.svg";
import { useThemeContext } from "../../context/ThemeContext";
import { useState } from "react";
import { myLike } from "../../services/media";
import ReactPlayer from "react-player";
import "./SingleMedia.scss";

function SingleMedia({ url, uploaded, likes, mediaId, username, profileImg }) {
  const { contextTheme } = useThemeContext();
  const [like, setLike] = useState(likes);

  async function handleLike() {
    try {
      const result = await myLike(mediaId);
      setLike(result.likes.length);
    } catch (error) {
      console.error("Error liking media", error);
    }
  }

  return (
    <>
      <div className="singleMediaCenterContainer">
        <main className="singleMediaContainer">
          <div className="singleMediaContainer__userData">
            <img
              className="singleMediaContainer__userData--profileImg"
              src={profileImg}
            />
            <span>{username}</span>
         
          </div>

          <div style={{ border: "solid" }} id={contextTheme}>
            {url &&
            (url.endsWith(".png") ||
              url.endsWith(".jpg") ||
              url.endsWith(".jfif")) ? (
              <img src={url} style={{ width: "100%" }} alt="Imagen" />
            ) : (
              <ReactPlayer
                url={url}
                width="100%"
                height={"300"}
                controls={true}
              />
            )}
          </div>
          <span className="singleMediaContainer__uploadDate">
            Uploaded: {uploaded}
          </span>
          <div className="singleMediaContainer__likesContainer">
            <img
              src={contextTheme === "Light" ? darkHeart : lightHeart}
              style={{ cursor: "pointer" }}
              onClick={handleLike}
            />
            <span style={{ marginTop: "10px" }}>{like}</span>
          </div>
        </main>
      </div>
    </>
  );
}

export default SingleMedia;
