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
      <div className="centerContainer">
        <div className="profileData">
          <img src={userInfo.profileImg} className="profileData__profileImg" />
          <h2 className="profileData__profileUsername">{userInfo.username}</h2>
        </div>
      </div>
      <ProfileInfo myMediaData={myMedia} />
    </>
  );
}

export default Profile;
