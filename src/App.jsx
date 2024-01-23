import "./App.scss";
import NightMode from "./components/NightMode/NightMode"
import foto3 from "./assets/images/captura.png";
import foto4 from "./assets/images/pizza.png";

function App() {
  return (
    <>
    <NightMode/>
      <main className="landing__page">
        <img className="landing__page--logo" src={foto4} />
      </main>
      <section className="landing__page__buttons">
        <button className="landing__page__buttons--button">LOG IN</button>
        <button className="landing__page__buttons--button">SIGN IN</button>
      </section>
    </>
  );
}

export default App;
