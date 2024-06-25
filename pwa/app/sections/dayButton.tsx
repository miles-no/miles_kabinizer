import React from "react";

interface DayButtonProps {
  date: Date | string;
  selected: boolean;
  onClick?: () => void;
}

export const DayButton: React.FC<DayButtonProps> = ({
  date,
  selected,
  onClick,
}) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  //todo: Simplify this. Use input instead of button
  return (
    <div
      className={`${
        selected
          ? "bg-accent text-accent-content"
          : "bg-white text-primary border-dashed border-2"
      } rounded-full h-16 w-16 text-center flex flex-col items-center justify-center cursor-pointer border-black`}
      aria-label={dateObj.toLocaleDateString()}
    >
      <input
        type="checkbox"
        className="hidden"
        aria-hidden="true"
        tabIndex={-1}
        checked={selected}
        value={dateObj.toLocaleDateString()}
      />
      <button
        className="w-full h-full flex flex-col items-center justify-center focus:ring-2 focus:ring-accent focus:rounded-full focus:border-accent focus:outline-none"
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (onClick) onClick();
          }
        }}
        aria-pressed={selected}
      >
        <div className="font-semibold text-sm">
          {dateObj.toLocaleDateString(undefined, { weekday: "short" })}
        </div>
        <div className="font-extrabold text-xl">{dateObj.getDate()}</div>
      </button>
    </div>
  );
};
