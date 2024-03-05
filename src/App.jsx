import "./App.scss";
import { useState } from "react";
import { useThemeContext } from "./context/ThemeContext";
import ReactSwitch from "react-switch";
import router from "./router/Router";
import { RouterProvider } from "react-router-dom";
import SwitchComponent from "./components/SwitchComponent/SwitchComponent";

function App() {
  const { contextTheme, setContextTheme } = useThemeContext();
  const [checked, setChecked] = useState(true);

  const handleSwitch = (nextChecked) => {
    setContextTheme((state) => (state === "Light" ? "Dark" : "Light"));
    setChecked(nextChecked);
  };
  return (
    <>
      <main className="app" id={contextTheme}>
        <div className="app__switchContainer" style={{position:"absolute"}}>
        {/* <SwitchComponent handleSwitch={handleSwitch} checked={checked} /> */}
        </div>
        <RouterProvider router={router} />
      </main>
    </>
  );
}

export default App;
