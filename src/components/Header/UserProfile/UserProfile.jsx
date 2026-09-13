import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, Typography, TextField, Button, Stack, Alert, Avatar } from "@mui/material";

import { logoutUser, updateUser } from "../../../store/slices/authSlice";

function UserProfile() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token, loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    phone: "",
  });

  const [avatar, setAvatar] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/auth");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        middleName: user.middleName || "",
        phone: user.phone || "",
      });
      setAvatar(user.avatar || "");
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) return;

    const res = await dispatch(
      updateUser({
        id: user.id,
        ...formData,
        avatar,
      })
    );

    if (!res.error) {
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 3000);
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
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
      }}
    >
      <Typography variant="h5" align="center" sx={{ mb: 2 }}>
        {t("profile.title")}
      </Typography>

      {successMsg && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {t("profile.saveSuccess")}
        </Alert>
      )}

      <Stack alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
        <Avatar
          src={avatar}
          alt={formData.firstName || "User"}
          sx={{ width: 80, height: 80 }}
        >
          {formData.firstName ? formData.firstName[0].toUpperCase() : null}
        </Avatar>
        <Button variant="outlined" size="small" component="label">
          {t("auth.choosePhoto")}
          <input type="file" hidden accept="image/*" onChange={handleAvatarChange} />
        </Button>
      </Stack>

      <Box component="form" onSubmit={handleSave}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            disabled
            label={t("auth.emailPlaceholder")}
            value={user?.email || ""}
          />

          <TextField
            fullWidth
            required
            label={t("auth.firstName")}
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            required
            label={t("auth.lastName")}
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label={t("auth.middleName")}
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label={t("auth.phone")}
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={loading}
          >
            {loading ? "..." : t("profile.saveButton")}
          </Button>

          <Button
            type="button"
            variant="text"
            color="error"
            fullWidth
            onClick={handleLogout}
          >
            {t("profile.logoutButton")}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default UserProfile;