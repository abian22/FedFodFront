import lightHeart from "../../assets/icons/lightHeart.svg";
import darkHeart from "../../assets/icons/darkHeart.svg";
import lightEdit from "../../assets/icons/lightEdit.svg";
import darkEdit from "../../assets/icons/darkEdit.svg";
import likedHeart from "../../assets/icons/likedHeart.svg";
import { useThemeContext } from "../../context/ThemeContext";
import { getProfile } from "../../services/user";
import { useEffect, useState } from "react";
import { sendNotification } from "../../services/notification";
import { myLike, updateMyMedia } from "../../services/media";
import { useTranslation } from "react-i18next";
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
  isLiked,
}) {
  const { contextTheme } = useThemeContext();
  const [t, i18n] = useTranslation("global");
  const [like, setLike] = useState(likes);
  const [isEditing, setIsEditing] = useState(false);
  const [myId, setMyId] = useState("");
  const [newDescription, setNewDescription] = useState(description);
  const [loggedUserData, setLoggedUserData] = useState([]);
  const [likedState, setLikedState] = useState(isLiked);

  useEffect(() => {
    myProfileInfo();
  }, []);

  async function myProfileInfo() {
    const result = await getProfile();
    setMyId(result._id);
    setLoggedUserData(result);
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
    setLikedState(!likedState);

    if (!result.likes.includes(loggedUserData._id) && !likedState) {
      await handleLikeNotification();
    }
  }

  async function handleLikeNotification() {
    await sendNotification({
      notifiedUserId: uploadedBy,
      actionUserId: loggedUserData._id,
      associatedItemId: mediaId,
      message: `${loggedUserData.username} liked your post`,
    });
  }

  function handleEditing() {
    setIsEditing(!isEditing);
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
              <div className="singleMediaContainer__buttonContainer">
                <button
                  className="singleMediaContainer__buttonContainer--saveButton"
                  id={contextTheme}
                  onClick={updateDescription}
                >
                  save
                </button>
                <button
                  className="singleMediaContainer__buttonContainer--cancelButton"
                  id={contextTheme}
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
          {t("videoContainer.uploaded")} {uploaded}
          </span>
          <div className="singleMediaContainer__likesContainer">
            <img
              src={
                likedState === true
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
