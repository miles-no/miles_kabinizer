import {
  BookingRequestService,
  CreateBookingRequestDto,
  DrawService,
} from "../../../../api";
import { CompareDates } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useUser from "@/hooks/useUser.tsx";
import { getMonthsMap, GetWeeklyPeriods } from "@/utils/calendar.ts";
import { useState } from "react";
import MonthOptionsComponent from "@/pages/selectPeriods/Calendar/MonthOptionsComponent.tsx";
import WeekDayRow from "@/components/WeekDayRow.tsx";

const DrawPeriodsCalendar = () => {
  const user = useUser();
  const queryClient = useQueryClient();

  const {
    data: draws,
    isLoading: isLoadingDraws,
    error: drawError,
  } = useQuery("getApiDrawCurrent", DrawService.getApiDrawCurrent);

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
      <WeekDayRow />

      <div className="flex flex-col gap-1">
        {Object.entries(monthMap).map(([month, weeks]) => (
          <MonthOptionsComponent
            key={month}
            month={month}
            weeks={weeks}
            bookingRequests={bookingRequests}
            toggleBooking={toggleBooking}
            loadingStates={loadingStates}
          />
        ))}
      </div>
    </div>
  );
};

export default DrawPeriodsCalendar;
