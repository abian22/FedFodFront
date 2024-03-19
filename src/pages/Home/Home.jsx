import { useState, useEffect } from "react";
import { getAllMedias } from "../../services/media";
import { getUserInfo } from "../../services/user";
import VideoContainer from "../../components/VideoContainer/VideoContainer";
import SearchComponent from "../../components/SearchComponent/SearchComponent";

function Home() {
  const [randomVideoList, setRandomVideoList] = useState([]);
  useEffect(() => {
    getRandomMedia();
  }, []);

  async function getRandomMedia() {
    try {
      const result = await getAllMedias();
      //Take the media from feedfood folder
      const feedfoodVideos = result.data.filter((v) =>
        v.mediaUrl.includes("feedfood")
      );
      //Iterate through all videos in the feedfood folder and retrieve user data for each video.
      const videosWithUserData = await Promise.all(
        feedfoodVideos.map(async (v) => {
          const userData = await getUserInfo(v.uploadedBy);
          return { ...v, userData };
        })
      );
      //randomize the videos with the user info
      const randomizedVideos = videosWithUserData.sort(
        () => Math.random() - 0.5
      );
      setRandomVideoList(randomizedVideos);
    } catch (error) {
      console.error("error with getRandomMedia function", error);
    }
  }

  return (
    <>
      <SearchComponent />
      {randomVideoList.map((v, index) => (
        <VideoContainer
          key={index}
          uploadedBy={v.uploadedBy}
          profileImg={v.userData.profileImg}
          name={v.userData.username}
          description={v.description}
          url={v.mediaUrl}
          mediaId={v._id}
          likes={v.likedBy.length}
          uploaded={v.createdAt.slice(0, 10)}
        />
      ))}
    </>
  );
}

export default Home;
