import React from "react";
import MonthColumn from "@/components/MonthVertical.tsx";
import { COLORS, MONTHS } from "@/options";

export const MonthsContainer = ({
  children,
  month,
}: {
  children: React.ReactNode;
  month: number;
}) => {
  return (
    <div key={month} className="flex items-center gap-x-4">
      <MonthColumn
        month={MONTHS[month]}
        color={COLORS[month % COLORS.length].selected}
      />
      <div
        className={`relative flex w-72 flex-col rounded-lg p-2 ${
          month % 2
            ? "bg-blue-200 dark:bg-blue-700"
            : "bg-purple-200 dark:bg-purple-700"
        }`}
      >
        {children}
      </div>
    </div>
  );
};
