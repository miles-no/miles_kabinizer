import { useQuery } from "react-query";
import { BookingRequestService } from "../../../api";

const useGetSelected = () => {
  const { data: selected = [] } = useQuery(["getApiBookingRequestUser"], () =>
    BookingRequestService.getApiBookingRequestUser("1"),
  );

  return selected;
};

export default useGetSelected;
