import { format } from "date-fns";
import { DrawService } from "../../api/services/DrawService";
import { Draw } from "../../api/models/Draw";
import DeleteButtonIcon from "../components/DeleteButtonIcon";

const DeleteDraw = ({ draw }: { draw: Array<Draw> }) => {
  const deleteDrawPeriods = (id: string | undefined) => {
    if (!id) return;
    DrawService.deleteApiDraw(id);
  };

  const formatDate = (date: string | undefined) => {
    if (!date) return "";

    return format(new Date(date), "dd-MM-yyyy");
  };

  return (
    <div className="flex w-full flex-col gap-8 rounded-xl bg-gray-300 p-4">
      <div className="rounded bg-[#354A71] p-2 ">
        <h2 className="font-poppins text-lg">Delete draw and period?</h2>
      </div>
      {draw?.map((draws) => (
        <div key={draws.id} className="flex gap-4 items-center">
            <div className="font-poppins flex flex-col w-full items-start gap-2 rounded bg-[#354A71] p-4 text-white">
              <p>Title: {draws?.title}</p>
              {draws?.periods?.map((period) => (
                  <div key={period.id}>
                  {`Period: ${formatDate(period?.periodStart)} -
                  ${formatDate(period?.periodEnd)}`}
                </div>
              ))}
            </div>
                  <button className="hover:bg-pink-700 rounded h-1/4" onClick={() => deleteDrawPeriods(draws?.id)}>
                    <DeleteButtonIcon/>
          </button>
        </div>
      ))}
    </div>
  );
};
export default DeleteDraw;
