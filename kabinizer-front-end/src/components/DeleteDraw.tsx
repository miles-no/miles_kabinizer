import { format } from "date-fns";
import { DrawService } from "../../api/services/DrawService";
import { Draw } from "../../api/models/Draw";

const DeleteDraw = (draw : Array<Draw> ) => {


    console.log("asdf data deletedraw", draw);
  const deleteDrawPeriods = (id: string | undefined) => {
    console.log("asdf id", id);
    if (!id) return;
    DrawService.deleteApiDraw(id);
  };

  const formatDate = (date: string | undefined) => {
    if (!date) return "";

    return format(new Date(date), "dd-MM-yyyy");
  };

  return (
    <div className="flex w-full flex-col gap-8 rounded-xl bg-gray-300 p-4">
      <div className="rounded-xl bg-[#354A71] p-2 ">
        <h2 className="font-poppins text-lg">Delete draw and period?</h2>
      </div>
      {draw.length > 0 && draw?.map((draws) => (
        <button onClick={() => deleteDrawPeriods(draw?.id)}>
          <div
            key={draws.id}
            className="font-poppins flex w-full items-center justify-center gap-8 rounded-full bg-[#354A71] px-4 text-white"
          >
            <p>{draws?.title}</p>
            {draws?.periods?.map((period) => (
              <p key={period.id}>
                {` ${formatDate(period?.periodStart)} -
                  ${formatDate(period?.periodEnd)}`}
              </p>
            ))}
          </div>
        </button>
      ))}
    </div>
  );
};
export default DeleteDraw;
