import { useMutation } from "react-query";
import Button from "../../components/Button";
import { BookingRequestService } from "../../../api";
import useUser from "../../hooks/useUser";
import { useEffect } from "react";

const Admin = () => {
  const { isAdmin } = useUser();

  const { mutate } = useMutation(
    () => BookingRequestService.getApiBookingRequestExport(),
    {
      onSuccess(data) {
        const blob = new Blob([data], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "export.csv");
        document.body.appendChild(link);
        link.click();
      },
    },
  );

  useEffect(() => {
    if (!isAdmin) {
      window.location.href = "/";
    }
  }, [isAdmin]);

  return (
    <div className="flex h-full w-full justify-center py-6 lg:py-16">
      <div className="flex h-full w-96 flex-col items-center gap-8">
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
