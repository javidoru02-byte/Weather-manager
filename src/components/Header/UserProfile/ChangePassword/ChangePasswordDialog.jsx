import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

import NormalChangeForm from "./NormalChangeForm";
import VerifyCodeForm from "./VerifyCodeForm";
import SetNewPasswordForm from "./SetNewPasswordForm";

export default function ChangePasswordDialog({ open, onClose, user, initialStep = "normal" }) {
  const { t } = useTranslation();

  const [step, setStep] = useState(initialStep);
  const [verifiedCode, setVerifiedCode] = useState("");
  const [targetEmail, setTargetEmail] = useState("");

  useEffect(() => {
    if (open) {
      setStep(initialStep);
      setVerifiedCode("");
      setTargetEmail("");
    }
  }, [open, initialStep]);

  const handleClose = () => {
    setStep(initialStep);
    onClose();
  };

  const handleForgotPassword = () => {
    setStep("code");
  };

  const handleCodeVerified = (code, email) => {
    setVerifiedCode(code);
    if (email) setTargetEmail(email);
    setStep("new");
  };

  const titles = {
    normal: t("profile.password.titleNormal"),
    code: t("profile.password.titleCode"),
    new: t("profile.password.titleNew"),
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>{titles[step]}</DialogTitle>
      <DialogContent dividers sx={{ pt: 2 }}>
        {step === "normal" && (
          <NormalChangeForm
            user={user}
            onSuccess={handleClose}
            onForgotPassword={handleForgotPassword}
            onClose={handleClose}
          />
        )}

        {step === "code" && (
          <VerifyCodeForm
            user={user}
            initialCodeSent={Boolean(user)}
            onSuccess={handleCodeVerified}
            onClose={handleClose}
          />
        )}

        {step === "new" && (
          <SetNewPasswordForm
            user={user}
            targetEmail={targetEmail}
            verifiedCode={verifiedCode}
            onSuccess={handleClose}
            onClose={handleClose}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}