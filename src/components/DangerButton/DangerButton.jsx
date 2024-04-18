import { useState } from "react";
import danger from "../../assets/icons/danger.svg";
import { useTranslation } from "react-i18next";
import "./DangerButton.scss";

const DangerButton = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [t, i18n] = useTranslation("global");

  const toggleMessage = () => {
    setShowMessage(!showMessage);
  };

  return (
    <div>
      <button
        style={{
          backgroundColor: "rgb(254, 198, 134)",
          borderRadius: "50px",
          cursor: "pointer",
          border: "solid",
          borderColor: "lightGrey",
        }}
        onClick={toggleMessage}
      >
        <img style={{ top: "0px", hieght: "20px" }} src={danger} />
      </button>
      {showMessage && (
        <div className="message">{t("danger.dangerMessage")}</div>
      )}
    </div>
  );
};

export default DangerButton;
