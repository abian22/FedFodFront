import "./InputComment.scss";

function InputComment() {
  return (
    <>
      <div className="centerContainer" style={{marginTop:"50px"}}>
        <div className="inputCommentContainer">
          <textarea
            className="inputCommentContainer__comment"
            placeholder="Your comment..."
          />
          <button style={{ marginLeft: "10px", position:"absolute"}}> Send </button>
        </div>
      </div>
    </>
  );
}

export default InputComment;
