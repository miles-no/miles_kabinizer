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
import CabinBookingPage, {
  loader as cabinBookingLoader,
  action as cabinBookingAction,
} from "@/pages/CabinBookingPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/cabin-booking",
    element: <CabinBookingPage />,
    loader: cabinBookingLoader,
    action: cabinBookingAction,
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
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <LoginPage />
      </UnauthenticatedTemplate>
    </>
  );
}

export default App;
