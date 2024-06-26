import { useState, useEffect } from "react";
import { useThemeContext } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import {
  getProfile,
  updateProfile,
  deleteMyAccount,
} from "../../services/user";
import { uploadProfileImg } from "../../services/media";
import { useTranslation } from "react-i18next";
import userIcon from "../../assets/icons/userIcon.svg";
import passwordIcon from "../../assets/icons/passwordIcon.svg";
import emailIcon from "../../assets/icons/emailIcon.svg";
import eyeIcon from "../../assets/icons/eyeIcon.svg";
import InputForm from "../../components/InputForm/InputForm";
import AccountInfoContainer from "../../components/AccountInfoContainer/AccountInfoContainer";
import "./MyAccount.scss";

function MyAccount() {
  const navigate = useNavigate();
  const [t, i18n] = useTranslation("global");
  const { contextTheme } = useThemeContext();
  const [isNewPassVisible, setIsNewPassVisible] = useState(false);
  const [isProfileImgOpen, setIsProfileImgOpen] = useState(false);
  const [isConfirmNewPassVisible, setIsConfirmNewPassVisible] = useState(false);
  const [accountData, setAccountData] = useState({
    username: "",
    email: "",
    password: "",
    profileImg: "",
  });
  const [newAccountData, setNewAccountData] = useState({
    username: "",
    email: "",
    password: "",
    newPassword: "",
  });

  useEffect(() => {
    getProfileData();
  }, []);

  const toggleProfileImg = () => {
    setIsProfileImgOpen(!isProfileImgOpen);
  };

  const handleNewPassword = () => {
    setIsNewPassVisible(!isNewPassVisible);
  };

  const handleConfirmNewPassword = () => {
    setIsConfirmNewPassVisible(!isConfirmNewPassVisible);
  };

  const handleUploadProfileImg = async (file) => {
    try {
      const result = await uploadProfileImg(file);
      setAccountData((prevData) => ({
        ...prevData,
        profileImg: result.image.mediaUrl,
      }));
      window.location.reload();
    } catch (error) {
      console.error("Error uploading profile image:", error);
    }
  };

  const getProfileData = async () => {
    const result = await getProfile();
    setAccountData({
      username: result.username,
      email: result.email,
      password: result.password,
      profileImg: result.profileImg,
    });
  };

  const handleDeleteMyAccount = async () => {
    await deleteMyAccount();
    navigate("/");
  };

  const saveNewProfileData = async () => {
    const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailValidation.test(newAccountData.email)) {
      return alert("Invalid email format");
    }
    if (newAccountData.password !== newAccountData.newPassword) {
      return alert("Passwords do not match");
    } else {
      try {
        const result = await updateProfile({
          username:
            newAccountData.username !== ""
              ? newAccountData.username
              : accountData.username,
          email:
            newAccountData.email !== ""
              ? newAccountData.email
              : accountData.email,
          password:
            newAccountData.password !== ""
              ? newAccountData.password
              : accountData.password,
        });
        setAccountData(result);
        localStorage.removeItem("token");
        navigate("/login");
      } catch (error) {
        if (error.response && error.response.status === 400) {
          return alert("Email already in use");
        }
      }
    }
  };

  const buttons = [
    t("myAccount.saveButton"),
    t("myAccount.leaveButton"),
    t("myAccount.deleteButton"),
  ];

  return (
    <>
      <AccountInfoContainer title={t("myAccount.title")}>
        <img
          src={accountData.profileImg}
          className="headerContainer__profileImg"
          style={{ marginBottom: "20px", marginRight: "20px" }}
          onClick={toggleProfileImg}
        />
        {isProfileImgOpen && (
          <>
            <form className="selectFileContainer">
              <label className="selectFileContainer__inputLabel">
                {t("myAccount.selectPhoto")}
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => handleUploadProfileImg(e.target.files[0])}
                />
              </label>
            </form>
          </>
        )}
        <InputForm
          title={t("signUpPage.username")}
          placeholder={t("signUpPage.usernamePlaceHolder")}
          iconStyle="MyAccountUserIcon"
          icon={userIcon}
          accountData={(value) =>
            setNewAccountData({ ...newAccountData, username: value })
          }
        />
        <InputForm
          title={t("signUpPage.email")}
          placeholder={accountData.email}
          iconStyle="MyAccountEmailIcon"
          icon={emailIcon}
          accountData={(value) =>
            setNewAccountData({ ...newAccountData, email: value })
          }
        />
        <InputForm
          title={t("myAccount.newPassword")}
          password="password"
          placeholder={t("myAccount.newPasswordPlaceHolder")}
          iconStyle="MyAccountNewPasswordIcon"
          icon={passwordIcon}
          eyeIcon={eyeIcon}
          handlePassword={handleNewPassword}
          isPassVisible={isNewPassVisible}
          eyeIconStyle="MyAccountNewPasswordEyeIcon"
          accountData={(value) =>
            setNewAccountData({ ...newAccountData, password: value })
          }
        />
        <InputForm
          title={t("myAccount.confirmNewPassword")}
          password="password"
          placeholder={t("myAccount.newPasswordPlaceHolder")}
          iconStyle="MyAccountConfirmNewPasswordIcon"
          icon={passwordIcon}
          eyeIcon={eyeIcon}
          handlePassword={handleConfirmNewPassword}
          isPassVisible={isConfirmNewPassVisible}
          eyeIconStyle="MyAccountConfirmNewPasswordEyeIcon"
          accountData={(value) =>
            setNewAccountData({ ...newAccountData, username: value })
          }
        />
        <div className="buttonsContainer">
          {buttons.map((button, index) => {
            return (
              <button
                className="buttonsContainer__button"
                key={index}
                type="button"
                id={contextTheme}
                onClick={() => {
                  if (button === "Save" || button === "Guardar") {
                    saveNewProfileData();
                  }
                  if (button === "Leave" || button === "Salir") {
                    navigate("/home");
                  }
                  if (
                    button === "Delete account" ||
                    button === "Borrar cuenta"
                  ) {
                    handleDeleteMyAccount();
                    navigate("/");
                  }
                }}
              >
                {button}
              </button>
            );
          })}
        </div>
      </AccountInfoContainer>
    </>
  );
}

export default MyAccount;
