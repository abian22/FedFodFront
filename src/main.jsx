import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeContextProvider } from "./context/ThemeContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import global_es from "./translations/es/global.json";
import global_en from "./translations/en/global.json";
import "./index.css";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    en: {
      global: global_en,
    },
    es: {
      global: global_es,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeContextProvider>
    <I18nextProvider i18n={i18next}>
      <GoogleOAuthProvider clientId="117559184212-j99liov0t8l1ct5rb3rqf89c1a9sfjkt.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </I18nextProvider>
  </ThemeContextProvider>
);
