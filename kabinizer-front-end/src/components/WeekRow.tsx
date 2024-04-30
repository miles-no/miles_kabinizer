import React from "react";

type WeekRowProps = {
  name: string;
  status: string;
  week: number;
  days: (number | null)[];
  disabled?: boolean;
  selected?: boolean;
  onWeekSelect?: (selected: boolean) => void;
};

export const WeekRow: React.FC<WeekRowProps> = ({
  name,
  status,
  week,
  days,
  disabled,
  selected,
  onWeekSelect,
}) => (
  <label className="grid h-10 cursor-pointer grid-cols-12 items-center rounded-xl border-2 border-transparent pl-2 pr-2 checked:border-miles-red-500">
    <p className="col-span-2 truncate text-start text-miles-red-900">
      {status}
    </p>
    <p className="col-span-2 text-center text-miles-red-900">{week}</p>
    {days.map((day, index) => (
      <p className="text-center" key={index}>
        {day ? day.toString() : ""}
      </p>
    ))}
    <div className=" flex justify-end">
      <input
        name={name}
        type="checkbox"
        checked={selected}
        onChange={(event) => onWeekSelect && onWeekSelect(event.target.checked)}
        className="checkbox-primary checkbox"
        disabled={disabled}
      />
    </div>
  </label>
);
