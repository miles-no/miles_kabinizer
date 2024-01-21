import { QueryClient, QueryClientProvider } from "react-query";
import { OpenAPI } from "../../api";
import { MsalProvider } from "@azure/msal-react";
import { ReactNode } from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import { ThemeProvider } from "./ThemeProvider";

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
      <MsalProvider instance={msalInstance}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          {children}
        </ThemeProvider>
      </MsalProvider>
    </QueryClientProvider>
  );
}

export default Providers;
