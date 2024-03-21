import "./InputComment.scss";
import { useState } from "react";

function InputComment({ onCommentSubmit }) {
  const [commentText, setCommentText] = useState("");

  const handleInputChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onCommentSubmit(commentText);
    setCommentText(""); // Limpiar el campo de texto después de enviar el comentario
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
          />
          <button onClick={handleSubmit} style={{ marginLeft: "10px", position: "absolute" }}>
            {" "}
            Send{" "}
          </button>
        </div>
      </div>
    </>
  );
}

export default InputComment;
