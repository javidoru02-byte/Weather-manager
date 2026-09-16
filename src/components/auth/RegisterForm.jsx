import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, Stack, TextField, Button, Alert } from "@mui/material";

import { registerUser, cleanError } from "../../store/slices/authSlice";

function RegisterForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    phone: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    return () => {
      dispatch(cleanError());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(registerUser(formData)).unwrap();
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
            label={t("auth.firstName")}
            name="firstName"
            fullWidth
            required
            value={formData.firstName}
            onChange={handleChange}
          />

          <TextField
            label={t("auth.lastName")}
            name="lastName"
            fullWidth
            required
            value={formData.lastName}
            onChange={handleChange}
          />

          <TextField
            label={t("auth.middleName")}
            name="middleName"
            fullWidth
            value={formData.middleName}
            onChange={handleChange}
          />

          <TextField
            label={t("auth.phone")}
            name="phone"
            type="tel"
            fullWidth
            value={formData.phone}
            onChange={handleChange}
          />

          <TextField
            label={t("auth.emailPlaceholder")}
            name="email"
            type="email"
            fullWidth
            required
            value={formData.email}
            onChange={handleChange}
          />

          <TextField
            label={t("auth.passwordPlaceholder")}
            name="password"
            type="password"
            fullWidth
            required
            value={formData.password}
            onChange={handleChange}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={loading}
          >
            {t("auth.submitRegister")}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default RegisterForm;