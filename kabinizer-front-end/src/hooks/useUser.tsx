import { useMsal } from "@azure/msal-react";
import { admins } from "../utils/admins";

const useUser = () => {
  const { accounts, instance } = useMsal();

  const isAdmin = admins.includes(accounts[0]?.username ?? "");

  return { ...accounts[0], isAdmin, instance } ?? { tenantId: "" };
};

export default useUser;
