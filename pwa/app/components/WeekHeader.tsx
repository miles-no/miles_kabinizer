import React from "react";

export const WeekHeader: React.FC = () => (
  <div className="grid grid-cols-12 border-2 border-transparent pl-2 pr-2 text-center">
    <p className="col-span-2 truncate text-start font-bold text-miles-red-900">
      Status
    </p>
    <p className="col-span-2 text-center font-bold text-miles-red-900">Uke</p>
    {["M", "T", "W", "T", "F", "S", "S"].map((dayLabel, index) => (
      <p key={index}>{dayLabel}</p>
    ))}
    <p className="text-end">Valgt</p>
  </div>
);
