import Admin from "./pages/admin";
import SelectPeriodsView from "./pages/selectPeriods";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import Gallery from "./pages/gallery";
import { LoginPage } from "@/LoginPage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "@/routes/root.tsx";
import TorjePage, {
  loader as torjeLoader,
  action as torjeAction,
} from "@/pages/torje.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/torje",
    element: <TorjePage />,
    loader: torjeLoader,
    action: torjeAction,
  },
  {
    path: "/select-periods",
    element: <SelectPeriodsView />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/gallery",
    element: <Gallery />,
  },
]);

function App() {
  return (
    <>
      <AuthenticatedTemplate>
        <RouterProvider router={router} />
        {/*<div className="sticky top-0 flex flex-wrap justify-center gap-2 overflow-scroll bg-miles-red-900 p-10">*/}
        {/*  {routes.map((route) => (*/}
        {/*    <a*/}
        {/*      className={*/}
        {/*        "content-center rounded-full bg-miles-red-500 pb-2 pl-4 pr-4 pt-2 font-bold text-white"*/}
        {/*      }*/}
        {/*      href={route.path}*/}
        {/*    >*/}
        {/*      {route.name}*/}
        {/*    </a>*/}
        {/*  ))}*/}
        {/*</div>*/}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <LoginPage />
      </UnauthenticatedTemplate>
    </>
  );
}

export default App;
