const MonthColumn = ({ month, color }: { month: string; color: string }) => {
  return (
    <div
      style={{
        writingMode: "vertical-lr",
        textOrientation: "upright",
        fontFamily: "Poppins, sans-serif",
        fontWeight: "600",
        color: color,
        fontSize: "16px",
        letterSpacing: "6px",
      }}
      className="flex h-0 justify-center uppercase"
    >
      {month}
    </div>
  );
};

export default MonthColumn;
