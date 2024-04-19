import { CreateBookingRequestDto } from "../../../api";

import WeekDayRow from "../../components/WeekDayRow";
import DrawPeriodsCalendar from "./Calendar/DrawPeriodsCalendar.tsx";
import { useState } from "react";
import DrawDeadlines from "./DrawDeadlines.tsx";
import Title from "../../components/Title.tsx";

const SelectPeriodsView = () => {
  const [selected, setSelected] = useState<CreateBookingRequestDto[]>([]);

  return (
    <div className="flex flex-col items-center py-10">
      <div className="flex w-96 flex-col items-center gap-4">
        <Title>Mine ønsker</Title>
        <DrawDeadlines />
        <div className="flex w-full justify-between">
          <Label />
        </div>
        <div className="flex flex-col gap-1">
          <WeekDayRow />
          <DrawPeriodsCalendar
            selected={selected}
            setSelected={(selected) => setSelected(selected)}
          />
        </div>
      </div>
    </div>
  );
};

const Label = () => {
  return (
    <div className="flex items-center gap-1">
      <p className="font-poppins">Ønsker</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          className="fill-black dark:fill-white"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM10 14.17L16.59 7.58002L18 9.00002L10 17L6 13L7.41 11.59L10 14.17Z"
        />
      </svg>
    </div>
  );
};

export default SelectPeriodsView;
