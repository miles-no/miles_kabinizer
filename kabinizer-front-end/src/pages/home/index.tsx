import { useQuery } from "react-query";
import { PeriodService } from "../../../api";
import { getOptions } from "../../utils";
import Calender from "./components/calender";
import { MOCKED_PERIODS } from "../../../mock/periods";

const Home = () => {
  const { data = [] } = useQuery(["getApiPeriod"], () =>
    PeriodService.getApiPeriod(),
  );

  console.log(data);

  const options = getOptions(MOCKED_PERIODS);

  return (
    <div>
      <Calender periods={MOCKED_PERIODS} options={options} />
    </div>
  );
};

export default Home;
