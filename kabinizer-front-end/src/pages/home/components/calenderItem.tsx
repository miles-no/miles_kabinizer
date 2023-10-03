import { useQuery } from "react-query";
import { BookingRequestService, Period } from "../../../../api";

const CalenderItem = ({ periodStart, periodEnd, isSpecialPeriod }: Period) => {
  const { data = [] } = useQuery([], () =>
    BookingRequestService.getApiBookingRequest()
  );

  const isSelected = data.some((item) => item.fromDate === periodStart);

  return (
    <button
      className={`w-100 h-12 ${
        isSpecialPeriod ? "bg-red-400" : "bg-blue-400"
      } ${isSelected && "bg-green-700"}`}
    >
      {periodStart} - {periodEnd}
    </button>
  );
};

export default CalenderItem;
