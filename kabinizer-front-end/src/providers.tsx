import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { OpenAPI } from "../api";
import { MsalProvider } from "@azure/msal-react";
import { ReactNode } from "react";
import { PublicClientApplication } from "@azure/msal-browser";

OpenAPI.BASE = "https://app-kabinizer-dev.azurewebsites.net";

function Providers({
  children,
  msalInstance,
}: {
  children: ReactNode;
  msalInstance: PublicClientApplication;
}) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MsalProvider instance={msalInstance}>{children}</MsalProvider>
    </QueryClientProvider>
  );
}

export default Providers;
