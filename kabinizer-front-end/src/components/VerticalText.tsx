const MonthColumn = ({ text }: { text: string }) => {
  return (
    <div
      style={{
        writingMode: "vertical-lr",
        textOrientation: "upright",
        fontFamily: "Poppins, sans-serif",
      }}
      className="flex font-semibold tracking-wider text-gray-700 dark:text-gray-300"
    >
      {text}
    </div>
  );
};

export default MonthColumn;
