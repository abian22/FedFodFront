import "./InputComment.scss";
import { useState } from "react";
import { useThemeContext } from "../../context/ThemeContext";

function InputComment({ onCommentSubmit }) {
  const { contextTheme } = useThemeContext();
  const [commentText, setCommentText] = useState("");

  const handleInputChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onCommentSubmit(commentText);
    setCommentText(""); 
  };

  return (
    <>
      <div className="centerContainer" style={{ marginTop: "50px" }}>
        <div className="inputCommentContainer">
          <textarea
            className="inputCommentContainer__comment"
            value={commentText}
            onChange={handleInputChange}
            placeholder="Your comment..."
            style={{ borderRadius: "10px" }}
          />
          <button
            onClick={handleSubmit}
            id={contextTheme}
            className="inputCommentContainer__sendButton"
          >
            Send{" "}
          </button>
        </div>
      </div>
    </>
  );
}

export default InputComment;
