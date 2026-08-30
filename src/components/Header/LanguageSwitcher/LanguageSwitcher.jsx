import { useTranslation } from "react-i18next";
import { ButtonGroup, Button } from "@mui/material";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <ButtonGroup size="small" variant="text" sx={{ mr: 2 }}>
      <Button
        onClick={() => changeLanguage("ua")}
        sx={{
          color: "white",
          fontWeight: i18n.resolvedLanguage === "ua" ? "bold" : "normal",
          textDecoration: i18n.resolvedLanguage === "ua" ? "underline" : "none",
        }}
      >
        UA
      </Button>
      <Button
        onClick={() => changeLanguage("en")}
        sx={{
          color: "white",
          fontWeight: i18n.resolvedLanguage === "en" ? "bold" : "normal",
          textDecoration: i18n.resolvedLanguage === "en" ? "underline" : "none",
        }}
      >
        EN
      </Button>
    </ButtonGroup>
  );
}

export default LanguageSwitcher;