import imagen from "../../assets/images/descarga.png";
import darkCancel from "../../assets/icons/darkCancelIcon.svg";
import lightHeart from "../../assets/icons/lightHeart.svg";
import darkHeart from "../../assets/icons/darkHeart.svg";
import lightCancel from "../../assets/icons/lightCancel.svg";
import { useThemeContext } from "../../context/ThemeContext";
import "./CommentComponent.scss";

function CommentComponent() {
  const { contextTheme } = useThemeContext();

  return (
    <>
      <div className="centerContainer">
        <div className="commentContainer">
          <div className="commentContainer__alignCommentContent">
            <div style={{ display: "flex" }}>
              <img
                className="commentContainer__alignCommentContent--profileImgOfTheComment"
                src={imagen}
              />
              <span>nombre del usuario</span>
            </div>
            <p className="commentContainer__textOfComment">
              texto del comentario comentario comentario
            </p>
            <div className="likeContainer">
              <img
                className="likeContainer__likeIcon"
                src={contextTheme === "Light" ? darkHeart : lightHeart}
              />
              <span style={{ marginLeft: "5px" }}>0</span>
            </div>
          </div>
          <img
            className="commentContainer__cancelIcon"
            src={contextTheme === "Light" ? darkCancel : lightCancel}
          />
        </div>
      </div>
    </>
  );
}

export default CommentComponent;
