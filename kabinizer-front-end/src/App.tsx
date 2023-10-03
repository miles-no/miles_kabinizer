import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Admin from "./pages/admin";
import Home from "./pages/home";
import { OpenAPI } from "../api";

OpenAPI.BASE = "https://app-kabinizer-dev.azurewebsites.net";

function App() {
  const showHome = window.location.pathname === "/";
  const showAdmin = window.location.pathname === "/admin";

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col items-center w-screen h-screen">
        <div className="flex items-center gap-4 p-2">
          <h1>Miles</h1>
          <h1 className="logo">Kabinizer</h1>
        </div>
        <div>
          {showHome && <Home />}
          {showAdmin && <Admin />}
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
