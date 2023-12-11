import { useMutation, useQuery } from "react-query";
import { BookingRequest, BookingRequestService } from "../../../api/index.ts";
import { draws } from "../../../mock/draws2.tsx";

import WeekDayRow from "../../components/WeekDayRow";
import Calendar from "./Calendar";
import { useState } from "react";
import Button from "../../components/Button.tsx";
import Deadline from "./Deadline.tsx";
import Title from "../../components/Title.tsx";
import useUser from "../../hooks/useUser.tsx";

const SelectPeriodsView = () => {
  const { tenantId } = useUser();
  const [selected, setSelected] = useState<BookingRequest[]>([]);

  const { data = [] } = useQuery(
    ["getApiDraw"],
    () =>
      // DrawService.getApiDraw(),
      draws,
  );

  const { mutate } = useMutation(() =>
    BookingRequestService.postApiBookingRequest(selected),
  );

  const handleSelectAll = () => {
    const allPeriods = data.map((d) => d.periods ?? []).flat();
    if (selected.length === allPeriods.length) {
      setSelected([]);
    } else {
      setSelected(
        allPeriods.map((p) => ({ periodId: p.id, userId: tenantId })),
      );
    }
  };

  return (
    <div className="flex flex-col items-center">
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
          <Button size="large" onClick={mutate}>
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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM10 14.17L16.59 7.58002L18 9.00002L10 17L6 13L7.41 11.59L10 14.17Z"
          fill="black"
        />
      </svg>
    </div>
  );
};

export default SelectPeriodsView;
