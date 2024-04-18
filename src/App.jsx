import "./App.scss";
import { useThemeContext } from "./context/ThemeContext";
import router from "./router/Router";
import { RouterProvider } from "react-router-dom";

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
