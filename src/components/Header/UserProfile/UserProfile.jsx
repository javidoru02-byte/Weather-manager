import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./UserProfile.css";

function UserProfile() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  function onLogout() {
    navigate("/auth");
  }

  return (
    <div className="userProfile">
      <span>{t("profile.greeting")}</span>
      <button onClick={onLogout} title={t("profile.logout")}>{t("profile.logout")}</button>
    </div>
  );
}

export default UserProfile;