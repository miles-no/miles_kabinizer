import invariant from "invariant";

// Environment variables should be set in the .env file, if not set, the app will throw an error
// tip: use .env.local to override the environment variables with your own values
export const validateEnvironmentVariables = () => {
  invariant(
    import.meta.env.VITE_SCOPES,
    "Environment variable VITE_SCOPES is not set",
  );
  invariant(
    import.meta.env.VITE_BASE_URL,
    "Environment variable VITE_BASE_URL is not set",
  );
  invariant(
    import.meta.env.VITE_CLIENT_ID,
    "Environment variable VITE_CLIENT_ID is not set",
  );
  invariant(
    import.meta.env.VITE_AUTHORITY,
    "Environment variable VITE_AUTHORITY is not set",
  );
  invariant(
    import.meta.env.VITE_REDIRECT_URI,
    "Environment variable VITE_REDIRECT_URI is not set",
  );
  invariant(
    import.meta.env.VITE_POST_LOGOUT_REDIRECT_URI,
    "Environment variable VITE_POST_LOGOUT_REDIRECT_URI is not set",
  );
};
