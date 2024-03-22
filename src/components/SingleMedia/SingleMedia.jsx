import lightHeart from "../../assets/icons/lightHeart.svg";
import darkHeart from "../../assets/icons/darkHeart.svg";
import lightEdit from "../../assets/icons/lightEdit.svg";
import darkEdit from "../../assets/icons/darkEdit.svg";
import likedHeart from "../../assets/icons/likedHeart.svg";
import { useThemeContext } from "../../context/ThemeContext";
import { getProfile } from "../../services/user";
import { useEffect, useState } from "react";
import { myLike, updateMyMedia, getSingleMedia } from "../../services/media";
import ReactPlayer from "react-player";
import "./SingleMedia.scss";

function SingleMedia({
  url,
  uploaded,
  likes,
  mediaId,
  username,
  profileImg,
  description,
  uploadedBy,
  getMediaData,
  likedBy,
}) {
  const { contextTheme } = useThemeContext();
  const [like, setLike] = useState(likes);
  const [isLiked, setIsLiked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [myId, setMyId] = useState("");
  const [newDescription, setNewDescription] = useState(description);

  useEffect(() => {
    myProfileInfo();
    setIsLiked(likedBy.includes(myId));
  }, [likedBy, myId]);

  async function myProfileInfo() {
    const result = await getProfile();
    setMyId(result._id);
  }

  async function updateDescription() {
    try {
      await updateMyMedia(mediaId, newDescription);
      setIsEditing(false);
      getMediaData();
    } catch (error) {
      console.error("Error updating media description", error);
    }
  }

  async function handleLike() {
    const result = await myLike(mediaId);
    setLike(result.likes.length);
    handleLikeIcon();
  }

  function handleEditing() {
    setIsEditing(!isEditing);
  }

  async function handleLikeIcon() {
    try {
      const result = await getSingleMedia(mediaId);
      setIsLiked(result.likedBy.includes(myId));
    } catch (error) {
      console.error("Error checking like status", error);
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
              alt="Profile image"
            />
            <span>{username}</span>
            {uploadedBy === myId && (
              <img
                src={contextTheme === "Light" ? darkEdit : lightEdit}
                style={{
                  height: "30px",
                  marginLeft: "auto",
                  cursor: "pointer",
                }}
                onClick={handleEditing}
                alt="Edit icon"
              />
            )}
          </div>
          {isEditing === false ? (
            <span>{description}</span>
          ) : (
            <>
              <div
                style={{
                  justifyContent: "end",
                  display: "flex",
                  marginBottom: "5px",
                }}
              >
                <button
                  style={{ marginRight: "20px", cursor: "pointer" }}
                  onClick={updateDescription}
                >
                  save
                </button>
                <button
                  style={{ cursor: "pointer" }}
                  onClick={() => setIsEditing(false)}
                >
                  cancel
                </button>
              </div>
              <textarea
                style={{ width: "100%" }}
                placeholder={description}
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              ></textarea>
            </>
          )}
          <div style={{ border: "solid", marginTop: "10px" }} id={contextTheme}>
            {url &&
            (url.endsWith(".png") ||
              url.endsWith(".jpg") ||
              url.endsWith(".jfif")) ? (
              <img src={url} style={{ width: "100%" }} alt="Image" />
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
              src={
                isLiked === true
                  ? likedHeart
                  : contextTheme === "Light"
                  ? darkHeart
                  : lightHeart
              }
              alt="Like icon"
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
