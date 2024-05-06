import { format } from "date-fns";
import { DrawService } from "../../api/services/DrawService";
import { Draw } from "../../api/models/Draw";
import DeleteButtonIcon from "../components/DeleteButtonIcon";
import EditPeriodView from "../components/EditPeriodView";
import { useState } from "react";
import Editicon from "../components/EditIcon";

const DeleteDraw = ({ draw }: { draw: Array<Draw> }) => {
  const deleteDrawPeriods = (id: string | undefined) => {
    if (!id) return;
    DrawService.deleteApiDraw(id);
  };
  const [youWantToDoSomeEditing, setYouWantToDoSomeEditing] = useState(false);

  const formatDate = (date: string | undefined) => {
    if (!date) return "";

    return format(new Date(date), "dd-MM-yyyy");
  };

  const wantToEdit = () => {
    setYouWantToDoSomeEditing(!youWantToDoSomeEditing);
  };

  return (
    <div className="flex w-full flex-col gap-8 rounded-xl bg-gray-300 p-4">
      <div className="rounded gap-10 bg-[#354A71]  text-center">
        <h2 className="text-lg h-10 flex w-full items-center justify-center rounded bg-[#354A71] px-4 font-poppins text-white">Slett eller endre trekning</h2>
      </div>
      {draw?.map((draws) => (
        <div key={draws.id} className="flex flex-col items-center gap-4">
          <div className="flex flex-row items-center gap-3">
            <button
              key={draws.id}
              onClick={() => wantToEdit()}
              className="rounded hover:bg-green-700"
            >
              <Editicon />
            </button>
            <div className="font-poppins flex w-full flex-col items-start gap-2 rounded bg-[#354A71] p-4 text-white">
              <p>{draws?.title}</p>
              {draws?.periods?.map((period) => (
                <div key={period.id}>
                  {`Periode  ${formatDate(period?.periodStart)} -
                  ${formatDate(period?.periodEnd)}`}
                </div>
              ))}
            </div>

            <button
              className="rounded hover:bg-pink-700"
              onClick={() => deleteDrawPeriods(draws?.id)}
            >
              <DeleteButtonIcon />
            </button>
          </div>
          {youWantToDoSomeEditing && <EditPeriodView draw={draws} />}
        </div>
      ))}
    </div>
  );
};
export default DeleteDraw;
