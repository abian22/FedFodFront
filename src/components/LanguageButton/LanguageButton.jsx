import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./LanguageButton.scss";
import flagEn from "../../assets/icons/engFlag.svg";
import flagEs from "../../assets/icons/espFlag.png";

function LanguageButton() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setIsOpen(false);
  };

  return (
    <div className="languageButton">
      <button
        className="languageButton__toggle"
        style={{
          backgroundColor: "white",
          color: isOpen ? "black" : "#333",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {i18n.language === "en" ? (
          <>
            <img
              className="languageButton__toggle--flag"
              src={flagEn}
              alt="English Flag"
            />
            English
          </>
        ) : (
          <>
            <img
              src={flagEs}
              alt="Spanish Flag"
              className="languageButton__toggle--flag"
            />
            Español
          </>
        )}{" "}
      </button>
      {isOpen && (
        <ul className="language-menu">
          <li style={{ listStyle: "none" }}>
            <button
              onClick={() => changeLanguage("en")}
              style={{
                backgroundColor: "white",
                color: "black",
                border: "none",
              }}
            >
              <img src={flagEn} alt="English Flag" />
              English
            </button>
          </li>
          <li style={{ listStyle: "none" }}>
            <button
              onClick={() => changeLanguage("es")}
              style={{
                backgroundColor: isOpen ? "white" : "transparent",
                color: isOpen ? "black" : "#333",
                border: "none",
              }}
            >
              <img src={flagEs} alt="Spanish Flag" />
              Español
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default LanguageButton;
