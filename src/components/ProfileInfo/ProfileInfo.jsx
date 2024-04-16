import ReactPlayer from "react-player";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import lightTrash from "../../assets/icons/lightTrash.svg";
import { useThemeContext } from "../../context/ThemeContext";
import darkTrash from "../../assets/icons/darkTrash.svg";
import { deleteMyMedia } from "../../services/media";
import { useTranslation } from 'react-i18next';

import "./ProfileInfo.scss";

function ProfileInfo({
  mediaData,
  posts,
  username,
  profileImg,
  getProfileMedia,
}) {
  const { contextTheme } = useThemeContext();
  const { t, i18n } = useTranslation("global");
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
          <img
            src={profileImg}
            className="profileData__profileImg"
            alt="profile image"
          />
          <h2 className="profileData__profileUsername">{username}</h2>
        </div>
      </div>
      <div className="centerContainer">
        <div>

          <p>{t("posts.posts")} {posts}</p>
        </div>
      </div>
      <div className="mediaDivider" />
      <div className="mediaGrid">
        {mediaData.map((m, index) => (
          <div
            key={index}
            className="mediaGrid__mediaItem"
            style={{ marginTop: "auto", paddingBottom: "0px", border: "solid" }}
          >
            {m.mediaUrl &&
            (m.mediaUrl.endsWith(".png") ||
              m.mediaUrl.endsWith(".jpg") ||
              m.mediaUrl.endsWith(".jfif")) ? (
              <>
                <div>
                  <div className="trashIconContainer">
                    <img
                      className="trashIconContainer__trashIcon"
                      src={contextTheme === "Light" ? darkTrash : lightTrash}
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
                <div className="trashIconContainer">
                  <img
                    className="trashIconContainer__trashIcon"
                    src={contextTheme === "Light" ? darkTrash : lightTrash}
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
