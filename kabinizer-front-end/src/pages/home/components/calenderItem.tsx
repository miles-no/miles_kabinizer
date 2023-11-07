import { useQuery } from "react-query";
import { BookingRequestService, Period } from "../../../../api";
import { useButton, useHover, usePress } from "react-aria";
import { useRef } from "react";
import { atom, useAtomValue, useSetAtom } from "jotai";
import {
  isDateInBetweenDates,
  isSameDay,
  isSpecialPeriod,
} from "../../../utils";
import { Option } from "../../../types";

const hoverAtom = atom<number | null>(null);
const activeAtom = atom<number | null>(null);

type CalenderItemProps = {
  periods: Period[];
  from: Date;
  options: Option[];
};

const CalenderItem = ({ periods, from, options }: CalenderItemProps) => {
  return (
    <>
      {[...Array(7)].map((_, index) => (
        <Square
          key={index}
          date={new Date(from.getTime() + index * 24 * 60 * 60 * 1000)}
          periods={periods}
          optionIndex={options.findIndex((o) =>
            isDateInBetweenDates(
              new Date(from.getTime() + index * 24 * 60 * 60 * 1000),
              o.from,
              o.to,
            ),
          )}
        />
      ))}
    </>
  );
};

const Square = ({
  date,
  periods,
  optionIndex,
}: {
  date: Date;
  periods: Period[];
  optionIndex: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const setActive = useSetAtom(activeAtom);
  const active = useAtomValue(activeAtom);
  const isActive = active === optionIndex;
  const setHover = useSetAtom(hoverAtom);
  const hover = useAtomValue(hoverAtom);
  const isHover = hover === optionIndex;

  const { buttonProps } = useButton({}, ref);

  const { pressProps } = usePress({
    shouldCancelOnPointerExit: true,
    onPressStart: () => {
      setActive(optionIndex);
    },
    onPressEnd: () => {
      setActive(null);
    },
  });

  const { hoverProps } = useHover({
    onHoverStart: () => {
      setHover(optionIndex);
      if (optionIndex !== active) {
        setActive(null);
      }
    },
    onHoverEnd: () => {
      setHover(null);
    },
  });

  const { data = [] } = useQuery(
    ["getApiBookingRequest"],
    () => BookingRequestService.getApiBookingRequest(),
    {
      refetchOnWindowFocus: false,
    },
  );

  // const { mutate } = useMutation(() =>
  //   BookingRequestService.postApiBookingRequest([
  //     {
  //       userId: "0",
  //       fromDate: from.toString(),
  //       toDate: to.toString(),
  //     },
  //   ])
  // );

  const isSelected = data.some((br) => {
    return isDateInBetweenDates(
      date,
      new Date(br.fromDate ?? ""),
      new Date(br.toDate ?? ""),
    );
  });

  const special = isSpecialPeriod(date, periods);

  const color = isSelected
    ? "border-green-400"
    : special
    ? "border-red-400"
    : "border-blue-400";

  const firstDay =
    periods.some((p) => isSameDay(date, new Date(p.periodStart ?? ""))) ||
    (date.getDay() === 1 && !special);

  const lastDay =
    periods.some((p) => isSameDay(date, new Date(p.periodEnd ?? ""))) ||
    (date.getDay() === 0 && !special);

  return (
    <div
      ref={ref}
      {...buttonProps}
      {...pressProps}
      {...hoverProps}
      className={`h-12 w-12 border-y-2 ${color} ${firstDay && "border-l-2"} ${
        lastDay && "border-r-2"
      } ${isHover && "bg-gray-200"} ${isActive && "bg-gray-800"}`}
    />
  );
};

export default CalenderItem;
