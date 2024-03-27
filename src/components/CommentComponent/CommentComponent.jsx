import { getProfile } from "../../services/user";
import { useState, useEffect } from "react";
import { deleteMyComment } from "../../services/comment";
import { commentLike } from "../../services/comment";
import { sendNotification } from "../../services/notification";
import { useThemeContext } from "../../context/ThemeContext";
import { getSingleMedia } from "../../services/media";
import darkCancel from "../../assets/icons/darkCancelIcon.svg";
import lightHeart from "../../assets/icons/lightHeart.svg";
import darkHeart from "../../assets/icons/darkHeart.svg";
import lightCancel from "../../assets/icons/lightCancel.svg";
import likedHeart from "../../assets/icons/likedHeart.svg";
import "./CommentComponent.scss";

function CommentComponent({
  comment,
  commentedAt,
  username,
  profileImg,
  userId,
  mediaId,
  commentId,
  getComments,
  likes,
  likedBy,
}) {
  const { contextTheme } = useThemeContext();
  const [userLoggedId, setUserLoggedId] = useState("");
  const [like, setLike] = useState(likes);
  const [isLiked, setIsLiked] = useState(false);
  const [myId, setMyId] = useState("");
  const [loggedUserData, setLoggedUserData] = useState([])

  useEffect(() => {
    myProfileInfo();
    getMyUserData();
  }, []);



  async function getMyUserData() {
    const result = await getProfile();
    setUserLoggedId(result._id);
    setLoggedUserData(result)
  }

  async function deleteComment() {
    await deleteMyComment(mediaId, commentId);
    getComments();
  }

  async function myProfileInfo() {
    const result = await getProfile();
    setMyId(result._id);
  }

  async function handleLike() {
    try {
      const result = await commentLike(commentId);
      setLike(result.likedBy.length);
      setIsLiked(!isLiked);
      handleLikeCommentNotification()
    } catch (error) {
      console.error("Error liking comment", error);
    }
  }

  async function handleLikeCommentNotification() {
    try {
      const media = await getSingleMedia(mediaId);
      await sendNotification({
        notifiedUserId: media.uploadedBy,
        actionUserId: loggedUserData._id,
        associatedItemId: mediaId,
        message: `${loggedUserData.username} liked your comment`,
      });
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  }

  // useEffect(() => {
  //   setIsLiked(likedBy.includes(myId));
  // }, [likedBy, myId]);

  return (
    <>
      <div className="centerContainer">
        <div className="commentContainer">
          <div className="commentContainer__alignCommentContent">
            <div style={{ display: "flex" }}>
              <img
                className="commentContainer__alignCommentContent--profileImgOfTheComment"
                src={profileImg}
                alt="Profile Image"
              />
              <span>{username} </span>
              <span className="commentContainer__alignCommentContent--commentContent">
                {commentedAt}
              </span>
            </div>
            <p className="commentContainer__textOfComment">{comment}</p>
            <div className="likeContainer">
              <img
                className="likeContainer__likeIcon"
                alt="Like icon"
                src={
                  isLiked
                    ? likedHeart
                    : contextTheme === "Light"
                    ? darkHeart
                    : lightHeart
                }
                onClick={handleLike}
              />
              <span style={{ marginLeft: "5px" }}>{like}</span>
            </div>
          </div>
          {userId === userLoggedId ? (
            <img
              className="commentContainer__cancelIcon"
              onClick={deleteComment}
              alt="Cancel icon"
              src={contextTheme === "Light" ? darkCancel : lightCancel}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default CommentComponent;
