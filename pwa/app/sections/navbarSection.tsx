import { Link } from "@remix-run/react";
import { ProfileDropdown } from "~/components/profileDropdown";

export const NavbarSection = () => {
  return (
    <section>
      <h2 className="text-2xl font-extrabold text-primary">Navbars</h2>
      <h3 className="text-xl font-extrabold text-primary pt-6">
        Simple Navbar
      </h3>
      <div className="navbar text-neutral-content bg-base-100 border-b">
        <button className="btn btn-ghost text-2xl text-accent">Hytte.ro</button>
      </div>

      <h3 className="text-xl font-extrabold text-primary pt-6">
        Navbar with profile
      </h3>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-2xl text-accent">
            Hytte.ro
          </Link>
        </div>
        <div className="flex-none gap-2">
          <ProfileDropdown />
        </div>
      </div>
    </section>
  );
};
