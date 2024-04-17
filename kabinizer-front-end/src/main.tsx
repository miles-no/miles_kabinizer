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
import Providers from "./providers/providers.tsx";
import { OpenAPI } from "../api";
import { validateEnvironmentVariables } from "@/utils/validateEnvironmentVariables.tsx";

validateEnvironmentVariables();

async function getToken() {
  const currentAccount = msalInstance.getActiveAccount();
  const scopes = [import.meta.env.VITE_SCOPES];
  const accessTokenRequest = {
    scopes,
    account: currentAccount ?? undefined,
  };
  if (currentAccount) {
    const accessTokenResponse =
      await msalInstance.acquireTokenSilent(accessTokenRequest);
    return accessTokenResponse.accessToken;
  }
  return "undefined";
}

OpenAPI.BASE = import.meta.env.VITE_BASE_URL;
OpenAPI.TOKEN = () => getToken();

const msalInstance = new PublicClientApplication({
  auth: {
    clientId: import.meta.env.VITE_CLIENT_ID,
    authority: import.meta.env.VITE_AUTHORITY,
    redirectUri: import.meta.env.VITE_REDIRECT_URI,
    postLogoutRedirectUri: import.meta.env.VITE_POST_LOGOUT_REDIRECT_URI,
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
