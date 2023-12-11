import { useMutation } from "react-query";
import Button from "../../components/Button";
import { BookingRequestService } from "../../../api";

const Admin = () => {
  const { mutate } = useMutation(() =>
    BookingRequestService.getApiBookingRequestExport(),
  );

  return (
    <div className="flex h-full w-full justify-center">
      <div className="flex h-full w-96 flex-col items-center gap-8">
        <h1>Admin</h1>
        <div className="flex w-full rounded-xl bg-gray-300 p-4">
          <div className="w-22 flex w-full flex-col items-center gap-4">
            <h2 className="font-poppins text-lg">Download selected periods</h2>
            <Button size="large" onClick={mutate}>
              DOWNLOAD
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
