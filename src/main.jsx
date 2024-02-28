import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeContextProvider } from "./context/ThemeContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeContextProvider>
    <GoogleOAuthProvider clientId="117559184212-j99liov0t8l1ct5rb3rqf89c1a9sfjkt.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </ThemeContextProvider>
);
