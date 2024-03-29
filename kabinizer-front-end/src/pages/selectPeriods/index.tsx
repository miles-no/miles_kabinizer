import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  BookingRequest,
  BookingRequestService,
  CreateBookingRequestDto,
  DrawService,
} from "../../../api/index.ts";

import WeekDayRow from "../../components/WeekDayRow";
import Calendar from "./Calendar/Calendar.tsx";
import { useState } from "react";
import Button from "../../components/Button.tsx";
import Deadline from "./Deadline.tsx";
import Title from "../../components/Title.tsx";
import { getAllBookingRequests } from "@/utils/calendar.ts";

const getDeletedBookings = (
  bookings: BookingRequest[] | undefined = [],
  selected: CreateBookingRequestDto[],
) => {
  return bookings.filter(
    (b) => !selected.map((s) => s.periodId).includes(b.period?.id),
  );
};

const SelectPeriodsView = () => {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState<CreateBookingRequestDto[]>([]);

  const { data = [], isLoading } = useQuery(["getApiDraw"], () =>
    DrawService.getApiDraw(),
  );

  const getSelectedBookingRequests = async () => {
    try {
      const bookingRequests =
        await BookingRequestService.getApiBookingRequest();

      setSelected(
        bookingRequests.map((d) => ({
          periodId: d.period?.id ?? "",
          userId: d.user?.id ?? "",
          bookingRequestId: d.bookingRequestId ?? "",
        })),
      );

      return bookingRequests;
    } catch (error) {
      console.error(error);
    }
  };

  const { data: bookings } = useQuery(
    ["getApiBookingRequest"],
    () => getSelectedBookingRequests(),
    { staleTime: Infinity, cacheTime: Infinity },
  );

  const handleUpdate = async () => {
    try {
      const deletedBookings = getDeletedBookings(bookings, selected);
      const deletedBookingIds = deletedBookings.map(
        (d) => d.bookingRequestId as string,
      );

      await BookingRequestService.deleteApiBookingRequest(deletedBookingIds);
      await BookingRequestService.postApiBookingRequest(selected);

      queryClient.invalidateQueries("getApiBookingRequest");
    } catch (error) {
      console.error(error);
    }
  };

  const { mutateAsync: update, isLoading: isUpdating } = useMutation(() =>
    handleUpdate(),
  );

  const handleSelectAll = () => {
    const allPeriods = getAllBookingRequests(data);
    if (selected.length === allPeriods.length) {
      setSelected([]);
    } else {
      setSelected(allPeriods);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">Loading...</div>
    );
  }

  return (
    <div className="flex flex-col items-center py-10">
      <div className="flex w-96 flex-col items-center gap-4">
        <Title>Mine ønsker</Title>
        <div className="w-full pb-10">
          <Deadline draws={data} />
        </div>
        <div className="flex w-full justify-between">
          <Label />
          <div className="w-32">
            <Button size="medium" onClick={handleSelectAll}>
              Marker alle
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <WeekDayRow />
          <Calendar
            draws={data}
            selected={selected}
            setSelected={(selected) => setSelected(selected)}
          />
        </div>
        <div className="flex h-8 w-full items-center justify-center px-20 pt-6">
          {isUpdating ? (
            <p className="ml-4">Lagrer...</p>
          ) : (
            <Button size="large" onClick={update} disabled={isLoading}>
              Lagre
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const Label = () => {
  return (
    <div className="flex items-center gap-1">
      <p className="font-poppins">Ønsker</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          className="fill-black dark:fill-white"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM10 14.17L16.59 7.58002L18 9.00002L10 17L6 13L7.41 11.59L10 14.17Z"
        />
      </svg>
    </div>
  );
};

export default SelectPeriodsView;
