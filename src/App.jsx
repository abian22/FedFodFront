import "./App.scss";
import { useState } from "react";
import { useThemeContext } from "./context/ThemeContext";
import ReactSwitch from "react-switch";
import router from "./router/Router";
import { RouterProvider } from "react-router-dom";
import SwitchComponent from "./components/SwitchComponent/SwitchComponent";

function App() {
  const { contextTheme, setContextTheme } = useThemeContext();

  return (
    <>
      <main className="app" id={contextTheme}>
        <RouterProvider router={router} />
      </main>
    </>
  );
}

export default App;
