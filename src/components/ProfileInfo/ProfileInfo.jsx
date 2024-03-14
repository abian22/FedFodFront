import ReactPlayer from "react-player";
import { useState, useEffect } from "react";
import "./ProfileInfo.scss";

function ProfileInfo({ myMediaData }) {
  const [videoHeight, setVideoHeight] = useState(80);
  const [videoMargin, setVideoMargin] = useState(50);

  const handleResize = () => {
    const newHeight = window.innerWidth < 636 ? 80 : 100;
    const newMargin = window.innerWidth < 636 ? 50 : 0;
    setVideoHeight(newHeight);
    setVideoMargin(newMargin);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="centerContainer">
        <div>
          <p>Followers: 100 </p>
          <p>Following: 50</p>
          <p>Posts: {myMediaData.length}</p>
        </div>
      </div>
      <div className="mediaDivider" />
      <div className="mediaGrid">
        {myMediaData.map((m, index) =>
          m.mediaUrl &&
          (m.mediaUrl.endsWith(".png") ||
            m.mediaUrl.endsWith(".jpg") ||
            m.mediaUrl.endsWith(".jfif")) ? (
            <img
              className="mediaGrid__mediaPhoto"
              src={m.mediaUrl}
              alt="Imagen"
              key={index}
            />
          ) : (
            <ReactPlayer
              url={m.mediaUrl}
              width={`${videoHeight}%`}
              height="80%"
              key={index}
              playing={true}
              muted={true}
              style={{
                border: "solid",
                marginLeft: `${videoMargin}px`,
                cursor: "pointer",
              }}
            />
          )
        )}
      </div>
    </>
  );
}

export default ProfileInfo;
