import { useRef, useState, useEffect } from "react";
import useUser from "../hooks/useUser";

function Navigation() {
  const ref = useRef<HTMLDivElement>(null);
  const { name, isAdmin, logOut } = useUser();
  const [openNav, setOpenNav] = useState(false);

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

  return (
    <div className="fixed inset-x-0 top-0 z-20 h-16 w-full">
      <div className="relavive flex h-full w-full items-end justify-between bg-[#EBEBEB] px-4 py-1 shadow-md">
        <Title />
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
            <UserProfile name={name ?? ""} />
            <nav className="flex flex-col gap-2">
              <Button variant="blue" href="/">
                Home
              </Button>
              <Button variant="blue" href="select-periods">
                Select periods
              </Button>
              {isAdmin && (
                <Button variant="red" href="admin">
                  Admin
                </Button>
              )}
              <Button variant="red" onClick={() => logOut()}>
                Logout
              </Button>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

const Title = () => (
  <h1 className="font-poppins text-xl font-bold text-[#B72318]">Kabinizer</h1>
);

type Props = {
  variant?: "blue" | "red";
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
};

const Button = ({ children, variant, href, onClick = () => null }: Props) => {
  const color =
    variant === "blue"
      ? "bg-[#354A71] hover:bg-blue-700"
      : "bg-red-500 hover:bg-red-700";
  const classes = `flex w-full justify-center ${color} px-4 py-2 font-poppins text-lg text-white hover:text-white disabled:pointer-events-none`;

  if (href !== undefined) {
    return (
      <a className={classes} href={href}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} onClick={() => onClick()}>
      {children}
    </button>
  );
};

export default Navigation;

const UserProfile = ({ name }: { name: string }) => {
  const initials = name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");

  return (
    <div className="mb-4 flex items-center gap-2">
      <div className="rounded-full bg-red-200 p-2">{initials}</div>{" "}
      <span>{name}</span>
    </div>
  );
};
