import { ColorType } from "@/types";
import { NumberOfDays } from "@/utils";

const OptionButton = ({
  colors,
  from,
  to,
  isSpecial,
  selected,
  onClick,
  isLoading = false,
}: {
  colors: ColorType;
  from: Date;
  to: Date;
  isSpecial: boolean;
  selected: boolean;
  onClick: () => void;
  isLoading?: boolean;
}) => {
  const days = NumberOfDays(from, to) + 1;

  let backgroundColor = isSpecial ? colors.special : colors.primary;

  if (selected) {
    backgroundColor = isSpecial ? colors.specialSelected : colors.selected;
  }

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`relative z-10 flex w-full flex-1 items-center justify-center rounded-full ${isLoading ? "opacity-50" : ""}`}
      style={{
        backgroundColor,
        height: "30px",
        flexGrow: days,
      }}
    >
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p
            style={{
              color: selected ? "white" : "black",
            }}
          >
            {days === 1
              ? from.getDate()
              : `${from.getDate()} - ${to.getDate()}`}
          </p>
          {selected && (
            <svg
              className="absolute right-1 ml-1"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM10 14.17L16.59 7.58002L18 9.00002L10 17L6 13L7.41 11.59L10 14.17Z"
                fill="white"
              />
            </svg>
          )}
        </>
      )}
    </button>
  );
};

export default OptionButton;
