import darkCancel from "../../assets/icons/darkCancelIcon.svg";
import lightHeart from "../../assets/icons/lightHeart.svg";
import darkHeart from "../../assets/icons/darkHeart.svg";
import lightCancel from "../../assets/icons/lightCancel.svg";
import { useThemeContext } from "../../context/ThemeContext";
import { getProfile } from "../../services/user";
import { useState, useEffect } from "react";
import { deleteMyComment } from "../../services/comment";
import { commentLike } from "../../services/comment";
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
}) {
  const { contextTheme } = useThemeContext();
  const [userLoggedId, setUserLoggedId] = useState([]);
  const [like, setLike] = useState(likes);

  useEffect(() => {
    getMyUserData();
  }, []);

  async function getMyUserData() {
    const result = await getProfile();
    setUserLoggedId(result._id);
  }

  async function deleteComment() {
    await deleteMyComment(mediaId, commentId);
    getComments();
  }

  async function handleLike() {
    const result = await commentLike(commentId);
    setLike(result.likedBy.length);
  }

  return (
    <>
      <div className="centerContainer">
        <div className="commentContainer">
          <div className="commentContainer__alignCommentContent">
            <div style={{ display: "flex" }}>
              <img
                className="commentContainer__alignCommentContent--profileImgOfTheComment"
                src={profileImg}
              />
              <span>{username} </span>
              <span
                style={{
                  marginLeft: "5px",
                  fontFamily: "arial",
                  fontSize: "12px",
                }}
              >
                {commentedAt}
              </span>
            </div>
            <p className="commentContainer__textOfComment">{comment}</p>
            <div className="likeContainer">
              <img
                className="likeContainer__likeIcon"
                src={contextTheme === "Light" ? darkHeart : lightHeart}
                onClick={handleLike}
              />
              <span style={{ marginLeft: "5px" }}>{like}</span>
            </div>
          </div>
          {userId === userLoggedId ? (
            <img
              className="commentContainer__cancelIcon"
              onClick={deleteComment}
              src={contextTheme === "Light" ? darkCancel : lightCancel}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default CommentComponent;
