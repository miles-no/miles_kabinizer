import { Option } from "@/types";
import { CreateBookingRequestDto } from "../../../../api";
import React from "react";
import { MONTHS } from "@/options";
import WeekOptionsComponent from "@/pages/selectPeriods/Calendar/WeekOptionsComponent.tsx";
import VerticalText from "@/components/VerticalText.tsx";

type MonthOptionsComponentProps = {
  month: string;
  weeks: Record<string, Option[]>;
  bookingRequests: CreateBookingRequestDto[] | undefined;
  toggleBooking: (periodId: string) => void;
  loadingStates: Record<string, boolean>;
};

const MonthOptionsComponent: React.FC<MonthOptionsComponentProps> = ({
  month,
  weeks,
  bookingRequests,
  toggleBooking,
  loadingStates,
}) => (
  <div key={month} className="flex items-center gap-x-4">
    <VerticalText text={MONTHS[Number(month)]} />
    <div
      className={`relative flex w-72 flex-col gap-y-4 rounded-lg p-2 ${
        Number(month) % 2 // Todo: consider css nth-child instead of this
          ? "bg-blue-200 dark:bg-blue-700"
          : "bg-purple-200 dark:bg-purple-700"
      }`}
    >
      {Object.entries(weeks).map(([week, options]) => (
        <WeekOptionsComponent
          week={week}
          month={month}
          options={options}
          bookingRequests={bookingRequests}
          toggleBooking={toggleBooking}
          loadingStates={loadingStates}
        />
      ))}
    </div>
  </div>
);
export default MonthOptionsComponent;
