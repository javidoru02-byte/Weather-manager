import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, Tabs, Tab, Typography, Button } from "@mui/material";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { continueAsGuest, cleanError } from "../../store/slices/authSlice";

function AuthPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  const [tabIndex, setTabIndex] = useState(0);
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
    dispatch(continueAsGuest());
    navigate("/");
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

      <Button
        fullWidth
        variant="text"
        onClick={handleGuestLogin}
        sx={{ mt: 2 }}
      >
        {t("auth.guestButton")}
      </Button>
    </Box>
  );
}

export default AuthPage;