import { useState, useEffect } from "react";
import { getAllMedias } from "../../services/media";
import { getUserInfo } from "../../services/user";
import VideoContainer from "../../components/VideoContainer/VideoContainer";
import SearchComponent from "../../components/SearchComponent/SearchComponent";
import { getProfile } from "../../services/user";

function Home() {
  const [randomVideoList, setRandomVideoList] = useState([]);
  const [myId, setMyId] = useState("");
  const [loggedUserData, setLoggedUserData] = useState([])

  useEffect(() => {
    getRandomMedia();
    getMyProfileInfo();
  }, []);

  async function getRandomMedia() {
    try {
      const result = await getAllMedias();
      const feedfoodVideos = result.data.filter((v) =>
        v.mediaUrl.includes("feedfood")
      );
      const videosWithUserData = await Promise.all(
        feedfoodVideos.map(async (v) => {
          const userData = await getUserInfo(v.uploadedBy);
          return { ...v, userData };
        })
      );
      const randomizedVideos = videosWithUserData.sort(
        () => Math.random() - 0.5
      );
      setRandomVideoList(randomizedVideos);
    } catch (error) {
      console.error("error with getRandomMedia function", error);
    }
  }

  async function getMyProfileInfo() {
    try {
      const result = await getProfile();
      setMyId(result._id);
      setLoggedUserData(result)
    } catch (error) {
      console.error("error getting user profile info", error);
    }
  }

  return (
    <>
      <SearchComponent />
      {randomVideoList.map((v, index) => (
        <VideoContainer
          key={index}
          loggedUserData={loggedUserData}
          uploadedBy={v.uploadedBy}
          profileImg={v.userData.profileImg}
          name={v.userData.username}
          description={v.description}
          url={v.mediaUrl}
          mediaId={v._id}
          userId={v.userData._id}
          likes={v.likedBy.length}
          uploaded={v.createdAt.slice(0, 10)}
          isLiked={v.likedBy.includes(myId)}
        />
      ))}
    </>
  );
}

export default Home;
