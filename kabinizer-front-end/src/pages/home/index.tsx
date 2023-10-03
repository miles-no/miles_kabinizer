import { useQuery } from "react-query";
import { PeriodService } from "../../../api";

const Home = () => {
  const { data = [], isLoading } = useQuery(["getApiPeriod"], () =>
    PeriodService.getApiPeriod()
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Home</h1>
      {data.map((period, index) => (
        <div key={index}>
          <p>{period.deadlineDate}</p>
          <p>{period.periodEnd}</p>
          <p>{period.periodStart}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
