const WeekNumber = ({ value }: { value: number }) => {
  return (
    <p
      style={{ fontFamily: "poppins", fontSize: "16px" }}
      className="flex w-3 items-center justify-center"
    >
      {value}
    </p>
  );
};

export default WeekNumber;
