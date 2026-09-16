import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, Tabs, Tab, Typography, Button, Divider } from "@mui/material";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import ChangePasswordDialog from "../Header/UserProfile/ChangePassword/ChangePasswordDialog";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { cleanError, loginWithGoogle } from "../../store/slices/authSlice";
import { GOOGLE_CLIENT_ID } from "../../constants/constants";

function AuthPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  const [tabIndex, setTabIndex] = useState(0);
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const isRegister = tabIndex === 1;

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleTabChange = (_event, newIndex) => {
    setTabIndex(newIndex);
    dispatch(cleanError());
  };

  const handleGuestLogin = () => {
    navigate("/");
  };

  const handleGoogleSuccess = (credentialResponse) => {
    if (credentialResponse.credential) {
      dispatch(loginWithGoogle(credentialResponse.credential));
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        my: 4,
        p: 3,
        border: "1px solid rgba(0, 0, 0, 0.12)",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{ mb: 3 }}
      >
        <Tab label={t("auth.loginTab")} />
        <Tab label={t("auth.registerTab")} />
      </Tabs>

      <Typography variant="h5" align="center" sx={{ mb: 2 }}>
        {isRegister ? t("auth.registerTitle") : t("auth.loginTitle")}
      </Typography>

      {isRegister ? <RegisterForm /> : <LoginForm />}

      {!isRegister && (
        <Button
          variant="text"
          size="small"
          onClick={() => setIsForgotOpen(true)}
          sx={{ mt: 1, textTransform: "none", display: "block", mx: "auto" }}
        >
          {t("auth.forgotPassword")}
        </Button>
      )}

      <Divider sx={{ my: 2.5 }}>{t("auth.orDivider")}</Divider>

      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => console.error("Google Login Failed")}
            theme="outline"
            shape="rectangular"
            width="100%"
          />
        </GoogleOAuthProvider>
      </Box>

      <Button
        fullWidth
        variant="text"
        onClick={handleGuestLogin}
        sx={{ mt: 2 }}
      >
        {t("auth.guestButton")}
      </Button>

      <ChangePasswordDialog
        open={isForgotOpen}
        onClose={() => setIsForgotOpen(false)}
        initialStep="code"
      />
    </Box>
  );
}

export default AuthPage;