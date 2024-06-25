export const ThemeOption = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="form-control">
      <label className="label cursor-pointer gap-4">
        <span className="label-text">{label}</span>
        <input
          type="radio"
          name="theme-radios"
          className="radio theme-controller"
          value={value}
        />
      </label>
    </div>
  );
};
