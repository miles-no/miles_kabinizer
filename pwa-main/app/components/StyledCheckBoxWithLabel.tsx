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
    className={`flex h-12 cursor-pointer items-center justify-between rounded-full border-2 bg-white pl-4 pr-4 text-lg font-semibold`}
    title={disabled ? "Dette valget er låst" : ""}
  >
    {title}
    <input
      className="checkbox checkbox-primary"
      name={name}
      type="checkbox"
      defaultChecked={defaultChecked}
      disabled={disabled}
    />
  </label>
);
