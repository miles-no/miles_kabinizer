import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Admin from "./pages/admin";
import Home from "./pages/home";
import { OpenAPI } from "../api";
import SelectPeriodsView from "./pages/selectPeriods";

OpenAPI.BASE = "https://app-kabinizer-dev.azurewebsites.net";

function App() {
  const showHome = window.location.pathname === "/";
  const showSelectPeriods = window.location.pathname === "/select-periods";
  const showAdmin = window.location.pathname === "/admin";

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen w-screen flex-col items-center">
        <div className="fixed inset-x-0 top-0 z-20 h-16 w-full">
          <div className="relavive h-full w-full bg-red-600 px-8 py-2">
            <img
              className="absolute left-2 top-1/4 h-8 sm:hidden"
              src="/miles_logo_small.svg"
            />
            <img
              className="absolute left-2 top-1/4 hidden h-8 sm:block"
              src="/miles_logo.svg"
            />
            <div className="absolute left-1/2 top-3 -translate-x-1/2">
              <h1 className="grad bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text font-pacifico text-4xl text-transparent drop-shadow-md">
                Kabinizer
              </h1>
            </div>
            <div className="absolute right-2">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 pb-10 pt-20">
          {showHome && <Home />}
          {showSelectPeriods && <SelectPeriodsView />}
          {showAdmin && <Admin />}
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
