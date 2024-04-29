import { useMsal } from "@azure/msal-react";
import { admins } from "../utils/admins";

const useUser = () => {
  const { accounts, instance } = useMsal();

  const isAdmin = admins.includes(accounts[0]?.username ?? ""); //Todo: Use a better way to check if user is admin

  const logOut = () => {
    instance.logoutRedirect();
  };

  return { ...accounts[0], isAdmin, logOut } ?? { tenantId: "" };
};

export default useUser;
