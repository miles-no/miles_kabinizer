const Home = () => {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-96 flex-col items-center gap-4">
        <h1>Home</h1>
        <div>
          <a href="select-periods" className="inline-block">
            <button className="rounded bg-[#354A71] px-4 py-2 font-bold text-white hover:bg-blue-700">
              Select periods
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
