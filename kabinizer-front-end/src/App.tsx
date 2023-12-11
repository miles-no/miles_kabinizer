import "./App.css";
import Admin from "./pages/admin";
import Home from "./pages/home";
import SelectPeriodsView from "./pages/selectPeriods";
import Navigation from "./Modules/Navigation";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";

const Pages = () => {
  const showHome = window.location.pathname === "/";
  const showSelectPeriods = window.location.pathname === "/select-periods";
  const showAdmin = window.location.pathname === "/admin";

  console.log("showHome", showSelectPeriods);
  return (
    <>
      {showHome && <Home />}
      {showSelectPeriods && <SelectPeriodsView />}
      {showAdmin && <Admin />}
    </>
  );
};

function App() {
  const isAuthenticated = useIsAuthenticated();
  const { instance } = useMsal();

  if (!!isAuthenticated) {
    instance.loginRedirect();
    return null;
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center">
      <Navigation />
      <div className="w-full flex-1 pb-10 pt-24">
        <Pages />
      </div>
    </div>
  );
}

export default App;
