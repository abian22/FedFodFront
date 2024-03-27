import { useThemeContext } from "../../context/ThemeContext";
import { useState, useEffect } from "react";
import { myLike } from "../../services/media";
import { getComments } from "../../services/comment";
import { sendNotification } from "../../services/notification";
import { Link } from "react-router-dom";
import lightHeart from "../../assets/icons/lightHeart.svg";
import lightComment from "../../assets/icons/lightComment.svg";
import darkComment from "../../assets/icons/darkComment.svg";
import darkHeart from "../../assets/icons/darkHeart.svg";
import ReactPlayer from "react-player";
import likedHeart from "../../assets/icons/likedHeart.svg";
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
  isLiked,
  loggedUserData,
}) {
  const { contextTheme } = useThemeContext();
  const [videoHeight, setVideoHeight] = useState(300);
  const [like, setLike] = useState(likes);
  const [likedState, setLikedState] = useState(isLiked);
  const [commentsCount, setCommentsCount] = useState(0);

  async function getAllComments() {
    try {
      const result = await getComments();
      const filteredComments = result.filter(
        (comment) => comment.commentedMedia === mediaId
      );
      setCommentsCount(filteredComments.length);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }

  async function handleLike() {
    try {
      const result = await myLike(mediaId);
      setLike(result.likes.length);
      setLikedState(!likedState);
  
      if (!result.likes.includes(loggedUserData._id) && !likedState) {
        await handleLikeNotification();
      }
    } catch (error) {
      console.error("Error liking media", error);
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

  const handleResize = () => {
    const newHeight = window.innerWidth < 900 ? 300 : 400;
    setVideoHeight(newHeight);
  };

  useEffect(() => {
    getAllComments();
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
            {url &&
            (url.endsWith(".png") ||
              url.endsWith(".jpg") ||
              url.endsWith(".jfif")) ? (
              <img src={url} style={{ width: "100%" }} alt="Image" />
            ) : (
              <ReactPlayer
                url={url}
                width="100%"
                height={videoHeight}
                controls={true}
              />
            )}
          </div>
          <span className="videoAndInteractionContainer__uploadDate">
            Uploaded: {uploaded}
          </span>
          <div className="videoAndInteractionContainer__interactionContainer">
            <div className="videoAndInteractionContainer__interactionContainer--likes">
              <img
                src={
                  likedState
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
            <div className="videoAndInteractionContainer__interactionContainer--comments">
              <Link
                to={`/home/media/${mediaId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  src={contextTheme === "Light" ? darkComment : lightComment}
                  alt="Comment icon"
                  style={{ cursor: "pointer" }}
                />
              </Link>
              <span style={{ marginTop: "10px" }}>{commentsCount}</span>
            </div>
          </div>
        </main>
      </center>
    </>
  );
}

export default VideoContainer;
