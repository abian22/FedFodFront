import { useParams } from "react-router";
import { getUserInfo } from "../../services/user";
import { useState, useEffect } from "react";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import { userMedia } from "../../services/media";

function SomeoneProfile() {
  const [userData, setUserData] = useState([]);
  const [userMediaData, setUserMediaData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getUserData();
    getUserMedia();
  }, []);

  async function getUserData() {
    const result = await getUserInfo(id);
    setUserData(result);
  }

  async function getUserMedia() {
    const result = await userMedia(id);
    setUserMediaData(result);
  }

  return (
    <>
      <ProfileInfo
        profileImg={userData.profileImg}
        username={userData.username}
        posts={userMediaData.length}
        mediaData={userMediaData}
      />
    </>
  );
}

export default SomeoneProfile;
