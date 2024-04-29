import Admin from "./pages/admin";
import SelectPeriodsView from "./pages/selectPeriods";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import Gallery from "./pages/gallery";
import { LoginPage } from "@/LoginPage.tsx";
import TorjePage from "@/pages/torje.tsx";

function Profile() {
  return <div>Profile</div>;
}

const routes = [
  {
    path: "/",
    component: TorjePage,
    name: "Mine ønsker",
  },
  {
    path: "/select-periods",
    component: SelectPeriodsView,
    name: "Select periods",
  },
  {
    path: "/admin",
    component: Admin,
    name: "Admin",
  },
  {
    path: "/gallery",
    component: Gallery,
    name: "Gallery",
  },
  {
    path: "/profile",
    component: Profile,
    name: "Profile",
  },
];

const Pages = () => {
  // const showHome = window.location.pathname === "/";
  const showSelectPeriods = window.location.pathname === "/select-periods";
  const showAdmin = window.location.pathname === "/admin";
  const showGallery = window.location.pathname === "/gallery";
  const torjePage = window.location.pathname === "/";
  return (
    <>
      {/*{showHome && <Home />}*/}
      {showSelectPeriods && <SelectPeriodsView />}
      {showAdmin && <Admin />}
      {showGallery && <Gallery />}
      {torjePage && <TorjePage />}
    </>
  );
};

function App() {
  return (
    <>
      <AuthenticatedTemplate>
        <Pages />
        <div className="bg-miles-red-900 sticky top-0 flex flex-wrap justify-center gap-2 overflow-scroll p-10">
          {routes.map((route) => (
            <a
              className={
                "bg-miles-red-500 content-center rounded-full pb-2 pl-4 pr-4 pt-2 font-bold text-white"
              }
              href={route.path}
            >
              {route.name}
            </a>
          ))}
        </div>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <LoginPage />
      </UnauthenticatedTemplate>
    </>
  );
}

export default App;
