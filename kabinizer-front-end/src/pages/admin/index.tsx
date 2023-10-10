import { Period } from "../../../api";
import { getOptions } from "../../utils";
import Options from "./components/Options";

const MOCKED_PERIODS: Period[] = [
  {
    periodStart: "2024-01-01",
    periodEnd: "2024-02-25",
    isSpecialPeriod: false,
    title: "",
  },
  {
    periodStart: "2024-02-26",
    periodEnd: "2024-02-29",
    isSpecialPeriod: true,
    title: "Vinterferie 1",
  },
  {
    periodStart: "2024-02-29",
    periodEnd: "2024-03-03",
    isSpecialPeriod: true,
    title: "Vinterferie 2",
  },
  {
    periodStart: "2024-03-04",
    periodEnd: "2024-03-24",
    isSpecialPeriod: false,
    title: "",
  },
  {
    periodStart: "2024-03-25",
    periodEnd: "2024-03-28",
    isSpecialPeriod: true,
    title: "Påskeferie 1",
  },
  {
    periodStart: "2024-03-28",
    periodEnd: "2024-04-01",
    isSpecialPeriod: true,
    title: "Påskeferie 2",
  },
  {
    periodStart: "2024-04-02",
    periodEnd: "2024-06-02",
    isSpecialPeriod: false,
    title: "",
  },
];

const Admin = () => {
  const options = getOptions(MOCKED_PERIODS);

  return (
    <div>
      <Options options={options} />
    </div>
  );
};

export default Admin;
