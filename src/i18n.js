import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationUA from "./assets/locales/ua.json"
import translationEN from "./assets/locales/en.json"

const resources = {
  ua: {
    translation: translationUA,
  },
  en: {
    translation: translationEN,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "ua",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;