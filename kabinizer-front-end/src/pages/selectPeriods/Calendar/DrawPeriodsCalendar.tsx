import {
  BookingRequestService,
  CreateBookingRequestDto,
  DrawService,
} from "../../../../api";
import { CompareDates } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useUser from "@/hooks/useUser.tsx";
import { getMonthsMap, GetWeeklyPeriods } from "@/utils/calendar.ts";
import Weeks from "@/pages/selectPeriods/Calendar/Weeks.tsx";
import { MonthsContainer } from "@/pages/selectPeriods/Calendar/MonthsContainer.tsx";

const DrawPeriodsCalendar = () => {
  const user = useUser();
  const queryClient = useQueryClient();

  const { data: draws, isLoading: isLoadingDraws } = useQuery(
    "getApiDraw",
    DrawService.getApiDraw,
  );
  const { data: bookingRequests, isLoading: isLoadingBookingRequests } =
    useQuery(
      "myBookingRequests",
      () => BookingRequestService.getApiBookingRequestUser(user.localAccountId),
      { enabled: !!user.localAccountId },
    );

  const addBooking = useMutation(
    "postApiBooking",
    (payload: CreateBookingRequestDto[]) =>
      BookingRequestService.postApiBookingRequest(payload),
    { onSuccess: () => queryClient.invalidateQueries("myBookingRequests") },
  );
  const removeBooking = useMutation(
    "deleteApiBooking",
    (payload: string[]) =>
      BookingRequestService.deleteApiBookingRequest(payload),
    { onSuccess: () => queryClient.invalidateQueries("myBookingRequests") },
  );

  if (isLoadingDraws || isLoadingBookingRequests) return <div>Loading...</div>;

  const periods = draws
    ?.flatMap((value) => value.periods ?? [])
    .sort(CompareDates);

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
        <MonthsContainer key={month} month={Number(month)}>
          <Weeks
            weeks={weeks}
            selected={bookingRequests || []}
            month={Number(month)}
            onClick={toggleBooking}
          />
        </MonthsContainer>
      ))}
    </div>
  );
};

export default DrawPeriodsCalendar;
