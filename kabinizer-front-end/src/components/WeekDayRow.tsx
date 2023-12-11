const WeekDayRow = () => {
  return (
    <div className="ml-8 flex flex-row items-center justify-between gap-1 py-1 pl-2 pr-3">
      <p>Uke</p>
      <div className="flex w-full justify-between">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d9d9d9]">
          M
        </div>
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d9d9d9]">
          T
        </div>
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d9d9d9]">
          O
        </div>
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d9d9d9]">
          T
        </div>
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d9d9d9]">
          F
        </div>
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d9d9d9]">
          L
        </div>
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d9d9d9]">
          S
        </div>
      </div>
    </div>
  );
};

export default WeekDayRow;
