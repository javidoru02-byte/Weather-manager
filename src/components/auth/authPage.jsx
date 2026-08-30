import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./authPage.css";

function AuthPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    navigate("/");
  }

  return (
    <div className="authPage">
      <div className="authCard">
        <h2>{t("auth.title")}</h2>
        <form onSubmit={onSubmit}>
          <input type="text" placeholder={t("auth.namePlaceholder")}/>
          <input type="email" placeholder={t("auth.emailPlaceholder")}/>
          <input type="password" placeholder={t("auth.passwordPlaceholder")}/>
          <button type="submit">{t("auth.submitButton")}</button>
        </form>
      </div>
    </div>
  );
}

export default AuthPage;