const WeekDayRow = () => {
  return (
    <div className="ml-8 flex flex-row items-center justify-between gap-1 py-1 pl-2 pr-3">
      <p>Uke</p>
      <div className="flex w-full justify-between">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d9d9d9] dark:bg-gray-600">
          M
        </div>
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d9d9d9] dark:bg-gray-600">
          T
        </div>
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d9d9d9] dark:bg-gray-600">
          O
        </div>
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d9d9d9] dark:bg-gray-600">
          T
        </div>
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d9d9d9] dark:bg-gray-600">
          F
        </div>
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d9d9d9] dark:bg-gray-600">
          L
        </div>
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d9d9d9] dark:bg-gray-600">
          S
        </div>
      </div>
    </div>
  );
};

export default WeekDayRow;
