import { Week } from "~/utils/createWeeksForMonth";

/**
 * WeekRow is a functional component that represents a row in a week-based view.
 * Each row contains the status, week number, days, and a checkbox for selection.
 *
 * @component
 * @param {Object} props - The properties that define the component's behavior and display.
 * @param {string} props.name - The name of the checkbox input field.
 * @param {string} props.status - The status displayed in the first column of the row.
 * @param {number} props.week - The week number displayed in the second column of the row.
 * @param {Week} props.days - An array of days in the week.
 * @param {boolean} [props.disabled=false] - A flag indicating whether the checkbox is disabled.
 * @param {boolean} [props.selected=false] - A flag indicating whether the checkbox is selected.
 * @param {(selected: boolean) => void} [props.onWeekSelect] - A callback function that is invoked when the checkbox is clicked.
 * @returns {React.ReactElement} A JSX element representing a row in a week-based view.
 */
export const WeekRow = (props: {
  name: string;
  status: string;
  week: number;
  days: Week;
  disabled?: boolean;
  selected?: boolean;
  onWeekSelect?: (selected: boolean) => void;
}): React.ReactElement => {
  const { name, status, week, days, disabled, selected, onWeekSelect } = props;
  return (
    <label className="grid h-10 cursor-pointer grid-cols-12 items-center rounded-xl border-2 border-transparent pl-2 pr-2 checked:border-miles-red-500">
      <p className="col-span-2 text-center text-miles-red-900">{week}</p>
      {days.map((day, index) => (
        <p className="text-center" key={index}>
          {day ? day.toString() : ""}
        </p>
      ))}
      <div className="flex justify-end">
        <input
          name={name}
          type="checkbox"
          checked={selected}
          onChange={(event) =>
            onWeekSelect && onWeekSelect(event.target.checked)
          }
          className="checkbox-primary checkbox"
          disabled={disabled}
        />
      </div>
    </label>
  );
};
