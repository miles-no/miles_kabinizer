import { Form } from "@remix-run/react";
import { ChangeEventHandler, useState } from "react";
import { useLoaderData } from "@remix-run/react";

export const loader = async () => {
  const data = {
    title: "Draw 1",
    description: "Description of draw 1",
    special_draw_exclude_last_year_winners: true,
    reserved_for_families_with_schoolchildren: false,
    periods: [
      { from: "2022-01-01", to: "2022-01-31" },
      { from: "2022-02-01", to: "2022-02-28" },
    ],
  };
  return data;
};

function Period({
  period,
  onChange,
  onRemove,
}: {
  period: { from: string; to: string };
  onChange: ChangeEventHandler<HTMLInputElement>;
  onRemove: () => void;
}) {
  return (
    <div className="flex gap-8 items-center">
      <label className="flex gap-2 items-center">
        <span className="text-gray-700">From:</span>
        <input
          className="border rounded-md p-2"
          type="date"
          name="from"
          value={period.from}
          onChange={onChange}
        />
      </label>
      <label className="flex gap-2 items-center">
        <span className="text-gray-700">To:</span>
        <input
          type="date"
          className="border rounded-md p-2"
          name="to"
          value={period.to}
          onChange={onChange}
        />
      </label>
      <button type="button" className="btn btn-secondary" onClick={onRemove}>
        Remove
      </button>
    </div>
  );
}

export default function AddDraw() {
  const data = useLoaderData<typeof loader>();
  const [periods, setPeriods] = useState(data.periods);

  function handlePeriodChange(
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) {
    const updatedPeriods = [...periods];
    updatedPeriods[index][event.target.name as keyof (typeof periods)[0]] =
      event.target.value;
    setPeriods(updatedPeriods);
  }

  function addPeriod() {
    setPeriods([...periods, { from: "", to: "" }]);
  }

  function removePeriod(index: number) {
    const updatedPeriods = [...periods];
    updatedPeriods.splice(index, 1);
    setPeriods(updatedPeriods);
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl">Edit draw</h1>
      <Form method="post" className="space-y-8">
        <div className="space-y-4">
          <label className="form-control">
            Title:
            <input
              id="title"
              type="text"
              name="title"
              required
              className="input input-bordered"
              defaultValue={data.title}
            />
          </label>
          <label className="form-control">
            Description:
            <textarea
              id="description"
              className="textarea textarea-bordered"
              name="description"
              defaultValue={data.description}
            />
          </label>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl">Draw Options</h2>
          <label className="items-center gap-2 flex cursor-pointer">
            <input
              type="checkbox"
              name="special_draw_exclude_last_year_winners"
              className="checkbox checkbox-primary"
              defaultChecked={data.special_draw_exclude_last_year_winners}
            />
            <span>{`Exclude last year's winners`}</span>
          </label>
          <label className="items-center gap-2 flex cursor-pointer">
            <input
              type="checkbox"
              name="reserved_for_families_with_schoolchildren"
              className="checkbox checkbox-primary"
              defaultChecked={data.reserved_for_families_with_schoolchildren}
            />
            <span>Reserved for families with schoolchildren</span>
          </label>
        </div>
        <div className="space-y-4">
          <span className="flex items-center justify-between">
            <h2 className="text-xl">Draw Periods</h2>
            <button type="button" className="btn btn-ghost" onClick={addPeriod}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
              Add another period
            </button>
          </span>
          {periods.map((period, index) => (
            <Period
              key={index}
              period={period}
              onChange={(event) => handlePeriodChange(event, index)}
              onRemove={() => removePeriod(index)}
            />
          ))}
        </div>
        <div className="flex  justify-end">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
}
