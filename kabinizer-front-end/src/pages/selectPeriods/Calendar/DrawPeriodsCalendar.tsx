import {
  BookingRequestService,
  CreateBookingRequestDto,
  DrawService,
} from "../../../../api";
import { CompareDates } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useUser from "@/hooks/useUser.tsx";
import { getMonthsMap, GetWeeklyPeriods } from "@/utils/calendar.ts";
import WeekNumber from "@/components/WeekNumber.tsx";
import MonthColumn from "@/components/MonthVertical.tsx";
import { COLORS, MONTHS } from "@/options";
import OptionButton from "@/components/OptionButton.tsx";
import { useState } from "react";

const DrawPeriodsCalendar = () => {
  const user = useUser();
  const queryClient = useQueryClient();

  const {
    data: draws,
    isLoading: isLoadingDraws,
    error: drawError,
  } = useQuery("getApiDraw", DrawService.getApiDraw);
  const {
    data: bookingRequests,
    isLoading: isLoadingBookingRequests,
    error: bookingError,
  } = useQuery(
    "myBookingRequests",
    () => BookingRequestService.getApiBookingRequestUser(user.localAccountId),
    { enabled: !!user.localAccountId },
  );
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({
    "": false,
  });
  const addBooking = useMutation(
    "postApiBooking",
    (payload: CreateBookingRequestDto[]) => {
      payload.forEach((p) => {
        setLoadingStates((prev) => ({ ...prev, [p.periodId || ""]: true }));
      });
      return BookingRequestService.postApiBookingRequest(payload);
    },
    {
      onSettled: (_data, _error, variables) => {
        variables.forEach((bookingRequestDto) => {
          setLoadingStates((prev) => ({
            ...prev,
            [bookingRequestDto.periodId || ""]: false,
          }));
        });
        return queryClient.invalidateQueries("myBookingRequests");
      },
    },
  );
  const removeBooking = useMutation(
    "deleteApiBooking",
    (payload: string[]) => {
      payload.forEach((id) => {
        setLoadingStates((prev) => ({ ...prev, [id]: true }));
      });
      return BookingRequestService.deleteApiBookingRequest(payload);
    },
    {
      onSettled: (_data, _error, variables) => {
        variables.forEach((id) => {
          setLoadingStates((prev) => ({ ...prev, [id]: false }));
        });
        return queryClient.invalidateQueries("myBookingRequests");
      },
    },
  );

  if (isLoadingDraws || isLoadingBookingRequests) return <div>Loading...</div>;

  const periods = draws
    ?.flatMap((value) => value.periods ?? [])
    .sort(CompareDates);

  if (drawError || bookingError) {
    return (
      <div>
        <p>An error occurred while fetching data. Please try again later.</p>
      </div>
    );
  }

  if (!periods?.length) return <div>No periods</div>;

  const monthMap = getMonthsMap(GetWeeklyPeriods(periods, draws || []));

  const toggleBooking = (periodId: string) => {
    const booking = bookingRequests?.find((b) => b.periodId === periodId);
    booking?.id
      ? removeBooking.mutate([booking.id])
      : addBooking.mutate([{ periodId }]);
  };

  return (
    <div className="flex flex-col gap-1">
      {Object.entries(monthMap).map(([month, weeks]) => (
        <div key={month} className="flex items-center gap-x-4">
          <MonthColumn
            month={MONTHS[Number(month)]}
            color={COLORS[Number(month) % COLORS.length].selected}
          />
          <div
            className={`relative flex w-72 flex-col rounded-lg p-2 ${
              Number(month) % 2
                ? "bg-blue-200 dark:bg-blue-700"
                : "bg-purple-200 dark:bg-purple-700"
            }`}
          >
            <div className="flex h-full flex-col gap-y-4">
              {Object.entries(weeks).map(([week, options]) => (
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
                          selected={
                            !!bookingRequests?.find(
                              (s) => s.periodId === option.id,
                            )
                          }
                          onClick={() => toggleBooking(option.id ?? "")}
                          isLoading={loadingStates[option.id || ""]}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DrawPeriodsCalendar;
