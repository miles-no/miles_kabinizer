import { useMutation, useQuery } from "react-query";
import {
  BookingRequest,
  BookingRequestService,
  CreateBookingRequestDto,
  DrawService,
} from "../../../api/index.ts";

import WeekDayRow from "../../components/WeekDayRow";
import Calendar from "./Calendar";
import { useState } from "react";
import Button from "../../components/Button.tsx";
import Deadline from "./Deadline.tsx";
import Title from "../../components/Title.tsx";

const getDeleteBookings = (
  bookings: BookingRequest[] | undefined = [],
  selected: CreateBookingRequestDto[],
) => {
  return bookings.filter(
    (b) => !selected.map((s) => s.periodId).includes(b.period?.id),
  );
};

const SelectPeriodsView = () => {
  const [selected, setSelected] = useState<CreateBookingRequestDto[]>([]);

  const { data = [], isLoading } = useQuery(["getApiDraw"], () =>
    DrawService.getApiDraw(),
  );

  const { data: bookings, refetch } = useQuery(
    ["getApiBookingRequest"],
    () => BookingRequestService.getApiBookingRequest(),
    {
      onSuccess: (data) => {
        console.log(data);
        setSelected(
          data.map((d) => ({
            periodId: d.period?.id ?? "",
            userId: d.user?.id ?? "",
            bookingRequestId: d.bookingRequestId ?? "",
          })),
        );
      },
      onError: (error) => {
        console.error(error);
      },
    },
  );

  const { mutateAsync: deleteBookings } = useMutation(
    () => {
      const deletedBookings = getDeleteBookings(bookings, selected);
      const deletedBookingIds = deletedBookings.map(
        (d) => d.bookingRequestId as string,
      );

      return BookingRequestService.deleteApiBookingRequest(deletedBookingIds);
    },
    {
      onError: (error) => {
        console.error(error);
      },
    },
  );

  const { mutate: addBookings } = useMutation(
    () => BookingRequestService.postApiBookingRequest(selected),
    {
      onSuccess: () => {
        refetch();
      },
      onError: (error) => {
        console.error(error);
      },
    },
  );

  const handleUpdate = async () => {
    await deleteBookings();
    await addBookings();
  };

  const handleSelectAll = () => {
    console.log("data", data);
    const allPeriods = data.reduce<CreateBookingRequestDto[]>((acc, cur) => {
      if (cur.periods) {
        const bookingRequests = cur.periods.map((p) => ({
          periodId: p.id ?? "",
        }));

        acc.push(...bookingRequests);
      }
      return acc;
    }, []);
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
        <div className="flex w-full items-center justify-center px-20 pt-6">
          <Button size="large" onClick={handleUpdate}>
            Lagre
          </Button>
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
