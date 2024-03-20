import SingleMedia from "../../components/SingleMedia/SingleMedia";
import { useParams } from "react-router";
import { getSingleMedia } from "../../services/media";
import { getUserInfo } from "../../services/user";
import { useState, useEffect } from "react";
import InputComment from "../../components/InputComment/InputComment";
import CommentComponent from "../../components/CommentComponent/CommentComponent";

function MediaPage() {
  const [singleMediaData, setSingleMediaData] = useState([]);
  const [userData, setUserData] = useState([]);
  const { mediaId } = useParams();

  useEffect(() => {
    handleSingleMedia();
  }, []);

  async function handleSingleMedia() {
    const result = await getSingleMedia(mediaId);
    console.log(result);
    if (result) {
      const userInfo = await getUserInfo(result.uploadedBy);
      setUserData(userInfo);
    }

    setSingleMediaData([result]);
  }

  console.log(singleMediaData);
  console.log(userData);
  return (
    <>

    {/*singlemedia es un map porque sino no me lee el length de likes no sé porque*/}
      {singleMediaData.map((s, index) => (
        <SingleMedia
          key={index}
          url={s.mediaUrl}
          likes={s.likedBy.length}
          uploaded={s.createdAt.slice(0, 10)}
          username={userData.username}
          profileImg={userData.profileImg}
          mediaId={s._id}
        />
      ))}
      <div style={{ paddingTop: "20px" }}>
        <InputComment />
        <CommentComponent />
      </div>
    </>
  );
}

export default MediaPage;
