import { Period } from "../../../api";
import { getOptions } from "../../utils";
import Calender from "./components/calender";

const MOCKED_PERIODS: Period[] = [
  {
    periodStart: "2024-01-01",
    periodEnd: "2024-02-25",
    isSpecialPeriod: false,
  },
  { periodStart: "2024-02-26", periodEnd: "2024-02-29", isSpecialPeriod: true },
  { periodStart: "2024-03-01", periodEnd: "2024-03-03", isSpecialPeriod: true },
  {
    periodStart: "2024-03-04",
    periodEnd: "2024-03-24",
    isSpecialPeriod: false,
  },
  { periodStart: "2024-03-25", periodEnd: "2024-03-28", isSpecialPeriod: true },
  { periodStart: "2024-03-29", periodEnd: "2024-04-01", isSpecialPeriod: true },
  {
    periodStart: "2024-04-02",
    periodEnd: "2024-06-02",
    isSpecialPeriod: false,
  },
];

const Home = () => {
  // const { data = [] } = useQuery(["getApiPeriod"], () =>
  //   PeriodService.getApiPeriod()
  // );

  const options = getOptions(MOCKED_PERIODS);

  return (
    <div>
      <Calender periods={MOCKED_PERIODS} options={options} />
    </div>
  );
};

export default Home;
