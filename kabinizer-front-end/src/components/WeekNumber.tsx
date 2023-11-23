const WeekNumber = ({ value }: { value: number }) => {
  return (
    <p
      style={{ fontFamily: "poppins", fontSize: "16px" }}
      className="flex items-center justify-center"
    >
      {value}
    </p>
  );
};

export default WeekNumber;
