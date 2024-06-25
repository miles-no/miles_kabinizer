import { Link } from "@remix-run/react";

export const ProfileDropdown = () => {
  return (
    <div className="dropdown dropdown-end">
      <div className="indicator">
        <span className="indicator-item badge badge-secondary">99+</span>
        <button className="btn btn-ghost btn-circle avatar relative">
          <img
            className="rounded-full"
            alt="Profile"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          />
        </button>
      </div>
      <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <Link to="/profile" className="justify-between p-4">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li>
          <Link to="/settings" className="p-4">
            Settings
          </Link>
        </li>
        <li>
          <Link to="/logout" className="p-4">
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};
