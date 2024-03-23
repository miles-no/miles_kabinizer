import OptionButton from "@/components/OptionButton";
import { COLORS } from "@/options";
import { Option } from "@/types";
import { CreateBookingRequestDto } from "api";

export type OptionsProps = {
  options: Option[];
  onClick: (id: string) => void;
  selected: CreateBookingRequestDto[];
  month: number;
};

const Options = ({ options, onClick, selected, month }: OptionsProps) => {
  return (
    <div className="grid h-[30px] w-full grid-cols-7 gap-x-[9px]">
      {options.map((option) => (
        <div
          key={option.id}
          className={`col-start-${option.start} col-span-${option.end - option.start + 1}`}
        >
          <OptionButton
            key={option.id}
            colors={COLORS[Number(month) % 2]}
            from={option.from}
            to={option.to}
            isSpecial={option.isSpecial}
            selected={!!selected.find((s) => s.periodId === option.id)}
            onClick={() => onClick(option.id ?? "")}
          />
        </div>
      ))}
    </div>
  );
};

export default Options;
