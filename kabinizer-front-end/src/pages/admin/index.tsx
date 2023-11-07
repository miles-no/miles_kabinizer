// import { useQuery } from "react-query";
// import { PeriodService } from "../../../api";
import { getOptions } from "../../utils";
import Options from "./components/Options";

import { MOCKED_PERIODS } from "../../../mock/periods";

const Admin = () => {
  // const { data = [] } = useQuery(["getApiPeriod"], () =>
  //   PeriodService.getApiPeriod(),
  // );

  const options = getOptions(MOCKED_PERIODS);

  return (
    <div>
      <Options options={options} />
    </div>
  );
};

export default Admin;
