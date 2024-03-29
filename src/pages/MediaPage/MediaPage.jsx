import SingleMedia from "../../components/SingleMedia/SingleMedia";
import { useParams } from "react-router";
import { getSingleMedia } from "../../services/media";
import { getUserInfo } from "../../services/user";
import { getCommentOfMedia } from "../../services/comment";
import { useState, useEffect } from "react";
import InputComment from "../../components/InputComment/InputComment";
import CommentComponent from "../../components/CommentComponent/CommentComponent";
import { postComment } from "../../services/comment";
import { sendNotification } from "../../services/notification";
import { getProfile } from "../../services/user";

function MediaPage() {
  const [singleMediaData, setSingleMediaData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [commentsData, setCommentsData] = useState([]);
  const [loggedUserData, setLoggedUserData] = useState([]);
  const { mediaId } = useParams();

  useEffect(() => {
    handleSingleMedia();
    getComments();
    getLoggedUserInfo();
  }, []);

  async function handleSingleMedia() {
    const result = await getSingleMedia(mediaId);
    if (result) {
      const userInfo = await getUserInfo(result.uploadedBy);
      setUserData(userInfo);
    }
    setSingleMediaData([result]);
  }

  async function getComments() {
    const result = await getCommentOfMedia(mediaId);
    const commentsWithUserData = await Promise.all(
      result.map(async (comment) => {
        const userData = await getUserInfo(comment.commentedBy);
        return { ...comment, userData };
      })
    );
    setCommentsData(commentsWithUserData);
  }

  async function postMyComment(commentText, mediaId) {
    try {
      await postComment(mediaId, commentText);
      getComments();
      handleSingleMedia();
      handleCommentNotification();
    } catch (error) {
      console.error("Error al enviar el comentario:", error);
    }
  }

  async function getLoggedUserInfo() {
    const result = await getProfile();
    setLoggedUserData(result);
  }

  async function handleCommentNotification() {
    if (singleMediaData && loggedUserData) {
      const media = singleMediaData.find((media) => media._id === mediaId);
      if (media) {
        await sendNotification({
          notifiedUserId: media.uploadedBy,
          actionUserId: loggedUserData._id,
          associatedItemId: media._id,
          message: `${loggedUserData.username} commented your post`,
        });
      } else {
        console.error("Media not found with the given mediaId:", mediaId);
      }
    }
  }

  return (
    <>
      {/*singlemedia es un map porque sino no me lee el length*/}
      {singleMediaData.map((s, index) => (
        <SingleMedia
          key={index}
          url={s.mediaUrl}
          likes={s.likedBy.length}
          likedBy={s.likedBy}
          isLiked={s.likedBy.includes(loggedUserData._id)}
          uploadedBy={s.uploadedBy}
          uploaded={s.createdAt.slice(0, 10)}
          username={userData.username}
          profileImg={userData.profileImg}
          description={s.description}
          mediaId={s._id}
          getSingleMedia={handleSingleMedia}
        />
      ))}
      <div style={{ marginBottom: "30px" }}>
        <InputComment
          onCommentSubmit={(commentText) => postMyComment(commentText, mediaId)}
        />
        {commentsData.map((c, index) => (
          <CommentComponent
            key={index}
            userId={c.commentedBy}
            mediaId={c.commentedMedia}
            commentId={c._id}
            comment={c.text}
            getComments={getComments}
            commentedAt={c.createdAt.slice(0, 10)}
            username={c.userData.username}
            profileImg={c.userData.profileImg}
            likes={c.likedBy.length}
            likedBy={c.likedBy}
            isLiked={c.likedBy.includes(loggedUserData._id)}
          />
        ))}
      </div>
    </>
  );
}

export default MediaPage;
