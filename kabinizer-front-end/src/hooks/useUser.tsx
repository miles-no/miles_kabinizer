import { useMsal } from "@azure/msal-react";

const useUser = () => {
  const { accounts } = useMsal();

  return accounts[0] ?? { tenantId: "" };
};

export default useUser;
