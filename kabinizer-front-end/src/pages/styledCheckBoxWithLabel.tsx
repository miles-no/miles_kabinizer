/**
 * StyledCheckBoxWithLabel
 * @param title
 * @param name
 * @param defaultChecked
 * @param disabled
 * @constructor
 */
export const StyledCheckBoxWithLabel = ({
  title,
  name,
  defaultChecked,
  disabled,
}: {
  title: string;
  name?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
}) => (
  <label
    className={`flex h-12 cursor-pointer items-center justify-between rounded-full border-2 bg-white pl-4 pr-4 text-lg font-semibold text-red-900`}
    title={disabled ? "Dette valget er låst" : ""}
  >
    {title}
    <input
      className="checkbox-primary checkbox"
      // className="checked:bg-miles-red-900 h-6 w-6 cursor-pointer appearance-none rounded border-2 border-gray-300 checked:border-transparent disabled:cursor-not-allowed disabled:border-transparent disabled:bg-gray-200"
      name={name}
      type="checkbox"
      defaultChecked={defaultChecked}
      disabled={disabled}
    />
  </label>
);
