import { atom, useAtomValue, useSetAtom } from "jotai";
import { Option } from "../../../types";
import { getDays } from "../../../utils";
import { useHover } from "react-aria";

const hoverAtom = atom<number | null>(null);

const OptionItem = ({
  option,
  id,
  halfDay,
}: {
  id: number;
  option: Option;
  halfDay: boolean;
}) => {
  const days = getDays(option.from, option.to);

  return (
    <>
      {days.map((day, index) => {
        const monday = day.getDay() === 1;
        return !(halfDay && index === days.length - 1) ? (
          <Item
            key={index}
            id={id}
            title={index === 0 ? option.title : undefined}
            special={option.isSpecialPeriod ?? false}
            firstDay={
              (index === 0 && option.halfDay) ||
              (monday && !option.isSpecialPeriod)
            }
            lastDay={index === days.length - 1 && !halfDay}
          />
        ) : (
          <div key={index} className="flex">
            <Item
              id={id}
              special={option.isSpecialPeriod ?? false}
              halfDay
              lastDay
            />
            <Item
              id={id + 1}
              special={option.isSpecialPeriod ?? false}
              halfDay
            />
          </div>
        );
      })}
    </>
  );
};

const Item = ({
  id,
  title,
  special,
  halfDay,
  firstDay,
  lastDay,
}: {
  id: number;
  title?: string | null;
  special?: boolean;
  halfDay?: boolean;
  firstDay?: boolean;
  lastDay?: boolean;
}) => {
  const setHover = useSetAtom(hoverAtom);
  const hover = useAtomValue(hoverAtom);
  const isHover = hover === id;
  const { hoverProps } = useHover({
    onHoverStart: () => setHover(id),
    onHoverEnd: () => setHover(null),
  });

  return (
    <div
      {...hoverProps}
      className={`relative h-12 ${halfDay ? "w-6" : "w-12"} flex items-center ${
        isHover ? "bg-gray-500" : special ? "bg-red-500" : "bg-blue-500"
      } border-y-2 border-black ${firstDay && "border-l-2"} ${
        lastDay && "border-r-2"
      }`}
    >
      {title && (
        <p className="absolute z-10 overflow-visible whitespace-nowrap pl-1 text-white">
          {title}
        </p>
      )}
    </div>
  );
};

export default OptionItem;
