export const ColorBox = ({
  colorClass,
  textColorClass,
  label,
}: {
  colorClass: string;
  textColorClass: string;
  label: string;
}) => {
  return (
    <div
      className={`w-1/4 h-24 ${colorClass} flex items-center justify-center rounded`}
    >
      <p className={`text-lg font-semibold ${textColorClass}`}>{label}</p>
    </div>
  );
};
