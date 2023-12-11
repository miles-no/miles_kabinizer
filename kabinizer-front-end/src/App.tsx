import "./App.css";
import Admin from "./pages/admin";
import Home from "./pages/home";
import SelectPeriodsView from "./pages/selectPeriods";
import Navigation from "./Modules/Navigation";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";

const Pages = () => {
  const showHome = window.location.pathname === "/";
  const showSelectPeriods = window.location.pathname === "/select-periods";
  const showAdmin = window.location.pathname === "/admin";

  return (
    <>
      {showHome && <Home />}
      {showSelectPeriods && <SelectPeriodsView />}
      {showAdmin && <Admin />}
    </>
  );
};

function App() {
  return (
    <div>
      <AuthenticatedTemplate>
        <div className="flex h-screen w-screen flex-col items-center">
          <Navigation />
          <div className="w-full flex-1 pb-10 pt-24">
            <Pages />
          </div>
        </div>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <LogIn />
      </UnauthenticatedTemplate>
    </div>
  );
}

const LogIn = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect();
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <button onClick={handleLogin}>Log in</button>
    </div>
  );
};

export default App;
