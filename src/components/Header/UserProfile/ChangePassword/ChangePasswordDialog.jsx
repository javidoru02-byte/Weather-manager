import { useTranslation } from "react-i18next";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

import NormalChangeForm from "./NormalChangeForm";

export default function ChangePasswordDialog({ open, onClose, user }) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{t("profile.password.titleNormal")}</DialogTitle>
      <DialogContent dividers sx={{ pt: 2 }}>
        <NormalChangeForm user={user} onSuccess={onClose} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}