import "./App.scss";
import { useState } from "react";
import { useThemeContext } from "./context/ThemeContext";
import ReactSwitch from "react-switch";
import foto4 from "./assets/images/pizza.png";

function App() {
  const { contextTheme, setContextTheme } = useThemeContext();
  const [checked, setChecked] = useState(true);

  const handleSwitch = (nextChecked) => {
    setContextTheme((state) => (state === "Light" ? "Dark" : "Light"));
    setChecked(nextChecked);
  };
  return (
    <>
      <div className="app" id={contextTheme}>
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
          id="material-switch"
        />
        <main className="app--landing__page">
          <img className="app--landing__page--logo" src={foto4} />
        </main>
        <section className="app--landing__page__buttons">
          <button className="app--landing__page__buttons--button" id={contextTheme}>
            LOG IN
          </button>
          <button className="app--landing__page__buttons--button" id={contextTheme}>
            SIGN IN
          </button>
        </section>
      </div>
    </>
  );
}

export default App;
