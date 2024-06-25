import { DayButton } from "~/sections/dayButton";

export const DayButtonsSection = () => {
  return (
    <section className="flex flex-col justify-center w-full h-full">
      <h2 className="text-2xl font-extrabold text-primary">Day buttons</h2>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-extrabold text-primary pt-6">
            Unselected
          </h3>
          <DayButton date={new Date("2022-01-09")} selected={false} />
        </div>

        <div>
          <h3 className="text-xl font-extrabold text-primary pt-6">Selected</h3>
          <DayButton date={new Date("2022-01-10")} selected={true} />
        </div>
      </div>
    </section>
  );
};
