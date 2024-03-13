import { useState } from "react";
import { useThemeContext } from "../../context/ThemeContext";
import { postMedia } from "../../services/media";
import "./Upload.scss";

function Upload() {
  const { contextTheme } = useThemeContext();
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState("");

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUploadFile = async () => {
    if (!selectedFile) {
      alert("No file selected");
    }
    try {
      const result = await postMedia(selectedFile, description);
      if (result.message === "Media uploaded") {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error uploading media:", error);
    }
  };

  return (
    <>
      <h2 className="centerContainer">Upload a file</h2>
      <div className="centerContainer">
        <form>
          <label className="fileSelectedStyle">
            {selectedFile ? selectedFile.name : "No file selected"}
          </label>

          <div className="centerContainer">
            <label className="inputLabelStyle">
              Click to select file
              <input
                id="fileInput"
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </label>
          </div>
          <div className="centerContainer">
            <label className="descriptionStyle">Description:</label>
          </div>
          <div className="centerContainer">
            <textarea
              className="textArea"
              rows="4"
              cols="50"
              onChange={handleDescriptionChange}
            />
          </div>
          <div className="buttonContainer">
            <button
              className="buttonContainer__button"
              type="button"
              id={contextTheme}
              onClick={handleUploadFile}
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Upload;
