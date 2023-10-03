import "./App.css";
import Admin from "./pages/admin";
import Home from "./pages/home";

function App() {
  const showHome = window.location.pathname === "/";
  const showAdmin = window.location.pathname === "/admin";

  return (
    <div className="app">
      <div className="text-3xl font-bold underline">Kabinizer</div>
      <div>
        {showHome && <Home />}
        {showAdmin && <Admin />}
      </div>
    </div>
  );
}

export default App;
