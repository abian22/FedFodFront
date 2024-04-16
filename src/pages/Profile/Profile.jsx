import { useState, useEffect } from "react";
import { getMyMedia } from "../../services/media";
import { getProfile } from "../../services/user";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";

function Profile() {

  const [myMedia, setMyMedia] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    handleGetMyMedia();
    handleUserInfo();
  }, []);

  async function handleGetMyMedia() {
    try {
      const result = await getMyMedia();
      const feedfoodMedia = result.filter((media) =>
        media.mediaUrl.includes("feedfood")
      );

      setMyMedia(feedfoodMedia);
    } catch (error) {
      console.error("Error en la función handleGetMyMedia:", error);
    }
  }

  async function handleUserInfo() {
    const result = await getProfile();
    console.log(result);
    setUserInfo(result);
  }

  return (
    <>
      <ProfileInfo
        profileImg={userInfo.profileImg}
        username={userInfo.username}
        posts={myMedia.length}
        mediaData={myMedia}
        mediaId={myMedia._id}
        getProfileMedia={handleGetMyMedia}
      />
    </>
  );
}

export default Profile;
