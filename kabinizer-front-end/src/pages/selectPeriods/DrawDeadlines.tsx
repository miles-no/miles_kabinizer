import { DrawService } from "../../../api";
import { FormatDate } from "@/utils";
import { useQuery } from "react-query";

const DrawDeadlines = () => {
  const { data: draws, isLoading } = useQuery(["getApiDraw"], () =>
    DrawService.getApiDraw(),
  );
  if (isLoading) return <div>Loading...</div>;
  if (!draws) return <div>No data</div>;

  return (
    <div className="w-full pb-10">
      <div className="rounded-xl bg-[#E6E6E6] p-2">
        <div className="flex justify-end">
          <h2 className="font-poppins font-bold text-[#515151]">Deadline</h2>
        </div>
        <div className="flex flex-col gap-1">
          {draws?.map((draw) => (
            <div key={draw.id} className="flex justify-between align-middle">
              <p className="text-l font-poppins font-bold text-[#020202]">
                {draw.title}
              </p>
              <p className="font-poppins text-2xl font-bold text-[#354A71]">
                {draw.end ? FormatDate(new Date(draw.end)) : "–"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrawDeadlines;
