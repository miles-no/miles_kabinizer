import { useMsal } from "@azure/msal-react";
import { useState } from "react";

export const LoginPage = () => {
  const { instance } = useMsal();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    await instance.loginRedirect().catch((e) => {
      setError(e.message);
    });
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <button
        onClick={handleLogin}
        className="h-16 w-72 rounded bg-miles-red-500 font-bold text-white disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none"
        type="submit"
      >
        Logg inn
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};
