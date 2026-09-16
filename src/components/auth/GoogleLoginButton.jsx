import { useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { loginWithGoogle } from "../../store/slices/authSlice";
import { GOOGLE_CLIENT_ID } from "../../constants/constants";

export default function GoogleLoginButton() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const googleBtnRef = useRef(null);
  const initialized = useRef(false);

  const handleCredentialResponse = useCallback(
    (response) => {
      if (response.credential) {
        dispatch(loginWithGoogle(response.credential));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (!window.google?.accounts?.id || initialized.current) return;

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
      auto_select: false,
      cancel_on_tap_outside: true,
    });

    if (googleBtnRef.current) {
      window.google.accounts.id.renderButton(googleBtnRef.current, {
        type: "standard",
        size: "large",
        theme: "outline",
        text: "signin_with",
        shape: "rectangular",
        logo_alignment: "left",
      });
    }

    initialized.current = true;
  }, [handleCredentialResponse]);

  const handleGoogleClick = () => {
    const googleButton = googleBtnRef.current?.querySelector("div[role='button']");
    if (googleButton) {
      googleButton.click();
    } else {
      console.warn("Google button not ready yet");
    }
  };

  return (
    <>
      <div
        ref={googleBtnRef}
        style={{
          position: "absolute",
          left: "-9999px",
          opacity: 0,
          pointerEvents: "none",
        }}
      />

      <Button
        fullWidth
        variant="outlined"
        startIcon={<GoogleIcon />}
        onClick={handleGoogleClick}
        sx={{ textTransform: "none", py: 1 }}
      >
        {t("auth.googleButton")}
      </Button>
    </>
  );
}