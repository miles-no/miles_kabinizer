import { Option } from "../../../types";
import OptionItem from "./OptionItem";

const Options = ({ options }: { options: Option[] }) => {
  return (
    <div className="grid grid-cols-7 gap-y-1">
      {options.map((option, index) => {
        return (
          <OptionItem
            key={index}
            id={index}
            option={option}
            halfDay={option.halfDay ?? false}
          />
        );
      })}
    </div>
  );
};

export default Options;
