import { Option } from "@/types";
import { CreateBookingRequestDto } from "../../../../api";
import React from "react";
import WeekNumber from "@/components/WeekNumber.tsx";
import OptionButton from "@/components/OptionButton.tsx";
import { COLORS } from "@/options";

type WeekOptionsComponentProps = {
  week: string;
  month: string;
  options: Option[];
  bookingRequests: CreateBookingRequestDto[] | undefined;
  toggleBooking: (periodId: string) => void;
  loadingStates: Record<string, boolean>;
};

const WeekOptionsComponent: React.FC<WeekOptionsComponentProps> = ({
  week,
  month,
  options,
  bookingRequests,
  toggleBooking,
  loadingStates,
}) => (
  <div key={week} className="flex w-full gap-x-4">
    <WeekNumber value={Number(week)} />
    <div className="grid h-[30px] w-full grid-cols-7 gap-x-[9px]">
      {options.map((option) => (
        <div
          key={option.id}
          className={`col-start-${option.start} col-span-${option.end - option.start + 1}`}
        >
          <OptionButton
            key={option.id}
            colors={COLORS[Number(month) % 2]}
            from={option.from}
            to={option.to}
            isSpecial={option.isSpecial}
            selected={!!bookingRequests?.find((s) => s.periodId === option.id)}
            onClick={() => toggleBooking(option.id ?? "")}
            isLoading={loadingStates[option.id || ""]}
          />
        </div>
      ))}
    </div>
  </div>
);
export default WeekOptionsComponent;
