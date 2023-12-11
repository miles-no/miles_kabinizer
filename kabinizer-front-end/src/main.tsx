import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  AuthenticationResult,
  EventMessage,
  EventType,
  PublicClientApplication,
} from "@azure/msal-browser";
import Providers from "./providers.tsx";
import { OpenAPI } from "../api";

async function getToken() {
  const currentAccount = msalInstance.getActiveAccount();
  const accessTokenRequest = {
    scopes: ["api://bfd7362f-1032-4565-820c-cd98e1874056/ApiAccess"],
    account: currentAccount ?? undefined,
  };

  if (currentAccount) {
    const accessTokenResponse =
      await msalInstance.acquireTokenSilent(accessTokenRequest);
    return `Bearer ${accessTokenResponse.accessToken}`;
  }
  return "undefined";
}

OpenAPI.BASE = "https://app-kabinizer-dev.azurewebsites.net";
OpenAPI.TOKEN = () => getToken();

const msalInstance = new PublicClientApplication({
  auth: {
    clientId: "7f2fc4da-ccf1-4c75-ab65-29654a5eaf53",
    authority: "https://login.microsoftonline.com/organizations",
    redirectUri: "/",
    postLogoutRedirectUri: "/",
  },
});

msalInstance.initialize().then(() => {
  // Account selection logic is app dependent. Adjust as needed for different use cases.
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
  }

  msalInstance.addEventCallback((event: EventMessage) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
      const payload = event.payload as AuthenticationResult;
      const account = payload.account;
      msalInstance.setActiveAccount(account);
    }
  });

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <Providers msalInstance={msalInstance}>
        <App />
      </Providers>
    </React.StrictMode>,
  );
});
