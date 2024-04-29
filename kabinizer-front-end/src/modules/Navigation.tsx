import useUser from "../hooks/useUser";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NameInitials } from "@/utils";

function Navigation() {
  return (
    <div className="fixed inset-x-0 top-0 z-20 h-16 w-full">
      <div className="relavive flex h-full w-full items-end justify-between bg-[#EBEBEB] px-4 py-1 shadow-md">
        <a href="/">
          <h1 className="">Kabinizer</h1>
        </a>
        <Navbar />
      </div>
    </div>
  );
}

const Navbar = () => {
  const { logOut, isAdmin } = useUser();

  return (
    <nav className="flex h-full items-center justify-center">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="z-50 my-4 list-none divide-y divide-gray-100 rounded-lg bg-white text-base shadow dark:divide-gray-600"
            id="user-dropdown"
          >
            <div className="block w-full md:w-auto" id="navbar-default">
              <a
                href="/"
                className="block rounded-t-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-700 dark:hover:bg-gray-600 dark:hover:text-white"
                aria-current="page"
              >
                Home
              </a>
              <a
                href="/gallery"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-700 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Gallery
              </a>
              <a
                href="/select-periods"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-700 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Select periods
              </a>
              <a
                href="/torje"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-700 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Torje
              </a>
              {isAdmin && (
                <a
                  href="/admin"
                  className="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Admin
                </a>
              )}
              <a
                onClick={() => logOut()}
                className="block cursor-pointer rounded-b-lg px-4 py-2 text-sm text-red-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Logout
              </a>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="mt-4 flex flex-col items-center rounded-lg border border-gray-100 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 rtl:space-x-reverse">
            <li>
              <a
                href="/"
                className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/gallery"
                className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                Gallery
              </a>
            </li>
            <li>
              <a
                href="/select-periods"
                className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                Select periods
              </a>
            </li>
            <li>
              <UserMenu />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const UserMenu = () => {
  const { logOut, name, username, isAdmin } = useUser();

  return (
    <div className="flex items-center space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
      <DropdownMenu>
        <DropdownMenuTrigger
          type="button"
          className="flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 md:me-0"
          id="user-menu-button"
          aria-expanded="false"
          data-dropdown-toggle="user-dropdown"
          data-dropdown-placement="bottom"
        >
          <span className="sr-only">Open user menu</span>
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>{NameInitials(name ?? "")}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="z-50 my-4 list-none divide-y divide-gray-100 rounded-lg bg-white text-base shadow dark:divide-gray-600"
          id="user-dropdown"
        >
          <div className="px-4 py-3">
            <span className="block text-sm text-gray-900">{name}</span>
            <span className="block truncate text-sm text-gray-500">
              {username}
            </span>
          </div>
          <ul className="py-2" aria-labelledby="user-menu-button">
            {isAdmin && (
              <li>
                <a
                  href="/admin"
                  className="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Admin
                </a>
              </li>
            )}
            <li>
              <a
                onClick={() => logOut()}
                className="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Logout
              </a>
            </li>
          </ul>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Navigation;
