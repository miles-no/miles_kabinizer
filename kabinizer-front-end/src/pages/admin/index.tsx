import { useMutation, useQuery } from "react-query";
import Button from "../../components/Button";
import { BookingRequestService } from "../../../api";
import useUser from "../../hooks/useUser";
import { useEffect, useState } from "react";
import NewPeriodView from "../../components/NewPeriodView";
import { DrawService } from "../../../api/services/DrawService";
import DeleteDraw from "../../components/DeleteDraw";

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
  const [showNewPeriodView, setShowNewPeriodView] = useState(false);

  const generateNewPeriod = () => {
    setShowNewPeriodView(!showNewPeriodView);
  };

  useEffect(() => {
    if (!isAdmin) {
      window.location.href = "/";
    }
  }, [isAdmin]);

  const { data : draws, isLoading} = useQuery(["getApiDraw"], () =>
    DrawService.getApiDraw(),
  );

  console.log("asdf data", draws, isLoading);

 

  return (
    <div className="flex h-full w-full justify-center py-6 lg:py-16">
      <div className="flex h-full w-96 flex-col items-center gap-8">
        <div className="flex w-full rounded-xl bg-gray-300 p-4">
          <div className="w-22 flex w-full flex-col items-center gap-4">
            <div className="rounded-xl bg-[#354A71] p-1 ">
              <h2 className="font-poppins text-lg">
                Download selected periods
              </h2>
            </div>
            <Button size="large" onClick={mutate}>
              DOWNLOAD
            </Button>
          </div>
        </div>
        <div className="flex w-96 flex-col justify-center gap-10 rounded-xl bg-gray-300 p-4">
          <Button size="large" onClick={generateNewPeriod}>
            Generate new period
          </Button>
        </div>
        {showNewPeriodView && <NewPeriodView />}
         {!isLoading && <DeleteDraw draw={draws} />}
      </div>
    </div>
  );
};

export default Admin;
