export const Button = ({
  className,
  label,
  tooltip,
  disabled,
}: {
  className: string;
  label: string;
  tooltip?: string;
  disabled?: boolean;
}) => {
  const buttonClasses = `btn ${className} rounded-full font-semibold`;

  return (
    <div className={tooltip ? "tooltip" : ""} data-tip={tooltip}>
      <button className={buttonClasses} disabled={disabled}>
        {label}
      </button>
    </div>
  );
};
