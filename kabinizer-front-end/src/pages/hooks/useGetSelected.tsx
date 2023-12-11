import { useQuery } from "react-query";
import { BookingRequestService } from "../../../api";
import useUser from "../../hooks/useUser";

const useGetSelected = () => {
  const { tenantId } = useUser();
  const { data: selected = [] } = useQuery(["getApiBookingRequestUser"], () =>
    BookingRequestService.getApiBookingRequestUser(tenantId),
  );

  return selected;
};

export default useGetSelected;
