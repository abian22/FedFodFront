import { useState } from "react";
import { useThemeContext } from "../../context/ThemeContext";
import { postMedia } from "../../services/media";
import { useTranslation } from "react-i18next";
import Loader from "../../components/Loader/Loader";
import "./Upload.scss";

function Upload() {
  const { contextTheme } = useThemeContext();
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar si la página está cargando
  const [t, i18n] = useTranslation("global");

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
      setIsLoading(true); // Activa el loader durante la carga
      await new Promise(resolve => setTimeout(resolve, 2000));
      const result = await postMedia(selectedFile, description);
      if (result.message === "Media uploaded") {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error uploading media:", error);
    } finally {
      setIsLoading(false); // Desactiva el loader cuando la carga haya terminado
    }
  };

  return (
    <>
      {isLoading ? <Loader /> : ( // Muestra el Loader si isLoading es true
        <>
          <h2 className="centerContainer">{t("upload.title")}</h2>
          <div className="centerContainer">
            <form>
              <label className="fileSelectedStyle">
                {selectedFile ? selectedFile.name : t("upload.noFileSelected")}
              </label>

              <div className="centerContainer">
                <label className="inputLabelStyle">
                  {t("upload.selectFileButton")}
                  <input
                    id="fileInput"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <div className="centerContainer">
                <label className="descriptionStyle">{t("upload.description")}</label>
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
                  {t("upload.upload")}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default Upload;
