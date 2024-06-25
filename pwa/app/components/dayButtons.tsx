import { useState } from "react";
import { DayButton } from "~/sections/dayButton";
import { Day } from "~/sections/specifyBookingDaysModalSection";

export const DayButtons = (props: {
  days: Day[];
  onDayClick: (day: Day) => void;
}) => {
  return (
    <p className="flex flex-wrap gap-2  justify-center ">
      {props.days.map((day) => (
        <DayButton
          key={day.date.getTime()}
          date={day.date}
          selected={day.selected}
          onClick={() => props.onDayClick(day)}
        />
      ))}
    </p>
  );
};
