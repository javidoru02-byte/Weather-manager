import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, Stack, TextField, Button, Alert } from "@mui/material";

import { loginUser, cleanError } from "../../store/slices/authSlice";

function LoginForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    return () => {
      dispatch(cleanError());
    };
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      navigate("/");
    } catch {
      // обробляється в слайсі 
    }
  };

  return (
    <Box
      sx={{
        minHeight: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%", maxWidth: 400 }}>
        <Stack spacing={2}>
          {error && (
            <Alert severity="error">
              {t(`auth.errors.${error}`)}
            </Alert>
          )}

          <TextField
            label={t("auth.emailPlaceholder")}
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label={t("auth.passwordPlaceholder")}
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={loading}
          >
            {t("auth.submitLogin")}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default LoginForm;