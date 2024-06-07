import { Form } from "@remix-run/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Period({
  period,
  onChange,
  onRemove,
}: {
  period: { from: string; to: string };
  onChange: React.ChangeEventHandler<HTMLInputElement>;
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
  const navigate = useNavigate();
  const [periods, setPeriods] = useState([{ from: "", to: "" }]);

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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const response = await fetch("/api/draws", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      navigate("/draws");
    } else {
      // Handle error
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      {/*<section>*/}
      {/*  <h2 className="text-2xl font-extrabold text-primary">Themes</h2>*/}
      {/*  <div className="flex items-center gap-4">*/}
      {/*    <div className="form-control">*/}
      {/*      <label className="label cursor-pointer gap-4">*/}
      {/*        <span className="label-text">Light</span>*/}
      {/*        <input*/}
      {/*          type="radio"*/}
      {/*          name="theme-radios"*/}
      {/*          className="radio theme-controller"*/}
      {/*          value="milesLight"*/}
      {/*        />*/}
      {/*      </label>*/}
      {/*    </div>*/}
      {/*    <div className="form-control">*/}
      {/*      <label className="label cursor-pointer gap-4">*/}
      {/*        <span className="label-text">Dark</span>*/}
      {/*        <input*/}
      {/*          type="radio"*/}
      {/*          name="theme-radios"*/}
      {/*          className="radio theme-controller"*/}
      {/*          value="milesDark"*/}
      {/*        />*/}
      {/*      </label>*/}
      {/*    </div>*/}
      {/*    <div className="form-control">*/}
      {/*      <label className="label cursor-pointer gap-4">*/}
      {/*        <span className="label-text">Svartedøden</span>*/}
      {/*        <input*/}
      {/*          type="radio"*/}
      {/*          name="theme-radios"*/}
      {/*          className="radio theme-controller"*/}
      {/*          value="cyberpunk"*/}
      {/*        />*/}
      {/*      </label>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}
      <h1 className="text-2xl">Add a New Draw</h1>
      <Form method="post" onSubmit={handleSubmit} className="space-y-4">
        <label className="form-control">
          Title:
          <input
            id="title"
            type="text"
            name="title"
            required
            className="input input-bordered"
          />
        </label>
        <label className="form-control">
          Description:
          <textarea
            id="description"
            className="textarea textarea-bordered"
            name="description"
          />
        </label>
        <hr />
        <div className="space-y-4">
          <h2 className="text-xl">Draw Options</h2>
          <label className="items-center gap-2 flex cursor-pointer">
            <input
              type="checkbox"
              name="special_draw_exclude_last_year_winners"
              className="checkbox checkbox-primary"
            />
            <span>{`Exclude last year's winners`}</span>
          </label>
          <label className="items-center gap-2 flex cursor-pointer">
            <input
              type="checkbox"
              name="reserved_for_families_with_schoolchildren"
              className="checkbox checkbox-primary"
            />
            <span>Reserved for families with schoolchildren</span>
          </label>
        </div>
        <hr />
        <div className="space-y-4">
          <h2 className="text-xl">Draw Periods</h2>
          {periods.map((period, index) => (
            <Period
              key={index}
              period={period}
              onChange={(event) => handlePeriodChange(event, index)}
              onRemove={() => removePeriod(index)}
            />
          ))}
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
