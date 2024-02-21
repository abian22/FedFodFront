import "./App.scss";
import { useState } from "react";
import { useThemeContext } from "./context/ThemeContext";
import ReactSwitch from "react-switch";
import router from "./router/Router";
import { RouterProvider } from "react-router-dom";

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
        <div className="app__switchContainer">
          <ReactSwitch
            onChange={handleSwitch}
            checked={checked}
            onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
            className="react-switch"
          />
        </div>
        <RouterProvider router={router} />
      </main>
    </>
  );
}

export default App;
