import DrawPeriodsCalendar from "./Calendar/DrawPeriodsCalendar.tsx";
import CurrentDrawDeadlines from "./CurrentDrawDeadlines.tsx";

const SelectPeriodsView = () => (
  <div className="flex flex-col items-center py-10">
    <div className="flex w-96 flex-col items-center gap-4">
      <h2 className="font-poppins text-2xl font-bold dark:text-white">
        Frister for trekning
      </h2>
      <CurrentDrawDeadlines />
      <h2 className="font-poppins text-2xl font-bold dark:text-white">
        Velg ønsket periode
      </h2>
      <DrawPeriodsCalendar />
    </div>
  </div>
);

export default SelectPeriodsView;
