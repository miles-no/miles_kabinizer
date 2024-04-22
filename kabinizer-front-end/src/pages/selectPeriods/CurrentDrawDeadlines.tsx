import { DrawService } from "../../../api";
import { FormatDate } from "@/utils";
import { useQuery } from "react-query";

const CurrentDrawDeadlines = () => {
  const { data: draws, isLoading } = useQuery(["getApiDrawCurrent"], () =>
    DrawService.getApiDrawCurrent(),
  );
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="w-full pb-10">
      <div className="rounded-xl bg-gray-100 p-2 dark:bg-gray-800">
        <div className="flex justify-end">
          <h2 className="font-poppins  font-bold text-gray-800 dark:text-gray-200">
            Frist
          </h2>
        </div>
        <div className="flex flex-col gap-1">
          {!draws && (
            <div>
              <p className="font-poppins text-xl font-bold text-gray-800 dark:text-gray-200">
                Det er for tiden ingen aktive trekninger
              </p>
            </div>
          )}
          {draws?.map((draw) => (
            <div key={draw.id} className="flex justify-between align-middle">
              <p className="font-poppins text-xl font-bold text-gray-800 dark:text-gray-200">
                {draw.title}
              </p>
              <p className="font-poppins text-2xl font-bold text-gray-800 dark:text-gray-200">
                {draw.end ? FormatDate(new Date(draw.end)) : "–"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrentDrawDeadlines;
