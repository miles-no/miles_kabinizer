import { QueryClient, QueryClientProvider } from "react-query";
import { MsalProvider } from "@azure/msal-react";
import { ReactNode } from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import { ThemeProvider } from "./ThemeProvider";

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
