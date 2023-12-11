import { useMsal } from "@azure/msal-react";
import { useRef, useState, useEffect } from "react";

const admins = [
  "fredrik.wigsnes@miles.no",
  "kjetil.husebo@miles.no",
  "siri.pedersen@miles.no",
  "kamilla.nyborg@miles.no",
];

function Navigation() {
  const ref = useRef<HTMLDivElement>(null);
  const { instance, accounts } = useMsal();
  const name = accounts[0]?.name ?? "";
  const username = accounts[0]?.username ?? "";
  const [openNav, setOpenNav] = useState(false);

  const handleLogOut = () => {
    instance.logoutRedirect();
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setOpenNav(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // Extract initials from name string
  const initials = name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");

  return (
    <div className="fixed inset-x-0 top-0 z-20 h-16 w-full">
      <div className="relavive flex h-full w-full items-end justify-between bg-[#EBEBEB] px-4 py-1 shadow-md">
        <h1 className="font-poppins text-xl font-bold text-[#B72318]">
          Kabinizer
        </h1>
        <div>
          <button onClick={() => setOpenNav((o) => !o)}>
            <svg
              height="32px"
              id="Layer_1"
              version="1.1"
              viewBox="0 0 32 32"
              width="32px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z" />
            </svg>
          </button>
        </div>
      </div>
      {openNav && (
        <div className="flex justify-end">
          <div className="h-fit w-48 bg-gray-300 px-2 py-4" ref={ref}>
            <div className="mb-4 flex items-center gap-2">
              <div className="rounded-full bg-red-200 p-2">{initials}</div>{" "}
              <span>{name}</span>
            </div>
            <nav className="flex flex-col gap-2">
              <a
                className="flex w-full  justify-center bg-[#354A71] px-4 py-2 font-poppins text-lg text-white  hover:bg-blue-700 disabled:pointer-events-none"
                href="/"
              >
                Home
              </a>
              <a
                className="flex w-full justify-center bg-[#354A71] px-4 py-2 font-poppins text-lg text-white  hover:bg-blue-700 disabled:pointer-events-none"
                href="select-periods"
              >
                Select periods
              </a>
              {admins.includes(username) && (
                <a
                  className="flex w-full  justify-center  bg-red-500 px-4 py-2 font-poppins text-lg text-white"
                  href="/admin"
                >
                  Admin
                </a>
              )}
              <button
                onClick={() => handleLogOut()}
                className="flex w-full  justify-center  bg-red-500 px-4 py-2 font-poppins text-lg text-white"
              >
                Logout
              </button>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navigation;
