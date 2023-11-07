const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <a href="select-periods" className="inline-block">
        <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
          Select periods
        </button>
      </a>
      <a href="admin" className="ml-4 inline-block">
        <button className="rounded bg-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-400">
          Admin
        </button>
      </a>
    </div>
  );
};

export default Home;
