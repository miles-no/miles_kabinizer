import { useMsal } from "@azure/msal-react";
import { useState } from "react";
import house from "../public/house.svg";

export const LoginPage = () => {
  const { instance } = useMsal();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    setLoading(true);
    await instance.loginRedirect().catch((e) => {
      setError(e.message);
      setLoading(false);
    });
  };

  return (
    <div className="bg-calm-yellow flex h-screen w-screen flex-col items-center justify-center">
      <img src={house} alt="house" className="fadeFromTop pb-2" />
      <h1 className="fadeFromBottom pb-2 text-3xl font-extrabold text-miles-red-500">
        Hytte.ro
      </h1>
      <button
        onClick={handleLogin}
        className="fadeFromBottom btn btn-primary btn-wide mt-4 rounded-full text-white"
        type="submit"
      >
        Logg inn
        <span className={loading ? "loading loading-spinner" : ""}></span>
      </button>
      {error && <p>{error}</p>}
      <img src="" alt="" />
    </div>
  );
};
