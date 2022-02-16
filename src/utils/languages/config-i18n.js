import i18n from "i18next";
import {initReactI18next} from "react-i18next";

import languages from "./locales";

i18n.use(initReactI18next).init({
  fallbackLng: "vi",
  lng: "vi",

  resources: languages,

  // have a common namespace used around the full app
  ns: ["common"],
  defaultNS: "common",

  debug: true,

  // cache: {
  //   enabled: true
  // },

  interpolation: {
    escapeValue: false, // not needed for react as it does escape per default to prevent xss!
  },
});

export default i18n;
