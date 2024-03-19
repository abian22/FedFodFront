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
    const result = await getMyMedia();
    setMyMedia(result);
  }

  async function handleUserInfo() {
    const result = await getProfile();
    console.log(result);
    setUserInfo(result);
  }

  console.log(myMedia);
  return (
    <>
      <ProfileInfo
      profileImg={userInfo.profileImg}
      username={userInfo.username}
      posts={myMedia.length}
      mediaData={myMedia} />
    </>
  );
}

export default Profile;
