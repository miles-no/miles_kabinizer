import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { PublicClientApplication } from "@azure/msal-browser";
import Providers from "./providers.tsx";
import { OpenAPI } from "../api";

OpenAPI.BASE = "https://app-kabinizer-dev.azurewebsites.net";

const msalInstance = new PublicClientApplication({
  auth: {
    clientId: "7f2fc4da-ccf1-4c75-ab65-29654a5eaf53",
    authority: "https://login.microsoftonline.com/organizations",
    redirectUri: "/",
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers msalInstance={msalInstance}>
      <App />
    </Providers>
  </React.StrictMode>,
);
