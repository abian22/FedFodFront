import ReactPlayer from "react-player";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import lightTrash from "../../assets/icons/lightTrash.svg";
import { useThemeContext } from "../../context/ThemeContext";
import darkTrash from "../../assets/icons/darkTrash.svg";
import lightEdit from "../../assets/icons/lightEdit.svg";
import darkEdit from "../../assets/icons/darkEdit.svg";
import { deleteMyMedia } from "../../services/media";
import "./ProfileInfo.scss";

function ProfileInfo({
  mediaData,
  posts,
  username,
  profileImg,
  getProfileMedia,
}) {
  const { contextTheme } = useThemeContext();

  const [videoMargin, setVideoMargin] = useState(50);

  const handleResize = () => {
    const newMargin = window.innerWidth < 636 ? 50 : 0;
    setVideoMargin(newMargin);
  };

  async function deleteMedia(mediaId) {
    await deleteMyMedia(mediaId);
    getProfileMedia();
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="centerContainer">
        <div className="profileData">
          <img src={profileImg} className="profileData__profileImg" />
          <h2 className="profileData__profileUsername">{username}</h2>
        </div>
      </div>
      <div className="centerContainer">
        <div>
          <p>Followers: 100 </p>
          <p>Following: 50</p>
          <p>Posts: {posts}</p>
        </div>
      </div>
      <div className="mediaDivider" />
      <div className="mediaGrid">
        {mediaData.map((m, index) => (
          <div
            key={index}
            className="mediaItem"
            style={{ marginTop: "auto", paddingBottom: "0px", border: "solid" }}
          >
            {m.mediaUrl &&
            (m.mediaUrl.endsWith(".png") ||
              m.mediaUrl.endsWith(".jpg") ||
              m.mediaUrl.endsWith(".jfif")) ? (
              <>
                <div>
                  <div
                    style={{ justifyContent: "space-between", display: "flex" }}
                  >
                    <img
                      src={contextTheme === "Light" ? darkEdit : lightEdit}
                      style={{ height: "30px" }}
                      alt="Trash icon"
                    />
                    <img
                      src={contextTheme === "Light" ? darkTrash : lightTrash}
                      style={{ height: "30px", cursor: "pointer" }}
                      onClick={() => deleteMedia(m._id)}
                      alt="Trash icon"
                    />
                  </div>
                </div>
                <Link
                  to={`/home/media/${m._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img
                    className="mediaGrid__mediaPhoto"
                    src={m.mediaUrl}
                    alt="Image"
                    style={{
                      marginBottom: "0px",
                    }}
                  />
                </Link>
              </>
            ) : (
              <div>
                <div
                  style={{ justifyContent: "space-between", display: "flex" }}
                >
                  <img
                    src={contextTheme === "Light" ? darkEdit : lightEdit}
                    style={{ height: "30px" }}
                    alt="Trash icon"
                  />
                  <img
                    src={contextTheme === "Light" ? darkTrash : lightTrash}
                    style={{ height: "30px", cursor: "pointer" }}
                    onClick={() => deleteMedia(m._id)}
                    alt="Trash icon"
                  />
                </div>
                <Link
                  to={`/home/media/${m._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ReactPlayer
                    url={m.mediaUrl}
                    playing={true}
                    muted={true}
                    controls={true}
                    width="100%"
                    height="100%"
                    style={{ display: "block" }}
                  />
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default ProfileInfo;
