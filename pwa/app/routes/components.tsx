import Logo from "~/components/Logo";
import { Link } from "@remix-run/react";

const ComponentsPage = () => {
  return (
    <div className="flex flex-col gap-8 p-4">
      <section>
        <h1 className="text-4xl font-extrabold textarea-accent">
          Components playground
        </h1>
        <p>This is a playground to test out and develop new components</p>
      </section>
      <section>
        <h2 className="max-w-xl text-2xl font-extrabold pb-4 text-primary">
          Colors
        </h2>
        <div className="flex flex-wrap gap-2">
          <div className="w-1/4 h-24 bg-primary flex items-center justify-center rounded">
            <p className="text-lg font-semibold text-primary-content">
              Primary
            </p>
          </div>
          <div className="w-1/4 h-24 bg-secondary flex items-center justify-center rounded">
            <p className="text-lg font-semibold text-secondary-content">
              Secondary
            </p>
          </div>
          <div className="w-1/4 h-24 bg-accent flex items-center justify-center rounded">
            <p className="text-lg font-semibold text-accent-content">Accent</p>
          </div>
          <div className="w-1/4 h-24 bg-neutral flex items-center justify-center rounded">
            <p className="text-neutral-content text-lg font-semibold">
              Neutral
            </p>
          </div>

          <div className="w-1/4 h-24 bg-info flex items-center justify-center rounded">
            <p className="text-info-content text-lg font-semibold">Info</p>
          </div>
          <div className="w-1/4 h-24 bg-success flex items-center justify-center rounded">
            <p className="text-success-content text-lg font-semibold">
              Success
            </p>
          </div>
          <div className="w-1/4 h-24 bg-warning flex items-center justify-center rounded">
            <p className="text-warning-content text-lg font-semibold">
              Warning
            </p>
          </div>
          <div className="w-1/4 h-24 bg-error flex items-center justify-center rounded">
            <p className="text-error-content text-lg font-semibold">Error</p>
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-extrabold text-primary">Navbars</h2>
        <h3 className="text-xl font-extrabold text-primary pt-6">
          Simple Navbar
        </h3>
        <div className="navbar text-neutral-content bg-base-100 border-b">
          <button className="btn btn-ghost text-2xl text-accent">
            Hytte.ro
          </button>
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
            <div className="dropdown dropdown-end">
              <div className="indicator">
                <span className="indicator-item badge badge-secondary">
                  99+
                </span>
                <button className="btn btn-ghost btn-circle avatar relative">
                  <img
                    className="rounded-full"
                    alt="Tailwind CSS Navbar component"
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
          </div>
        </div>
      </section>
      <p
        style={{
          fontSize: "16px",
        }}
      ></p>
      <section>
        <h2 className=" text-2xl font-extrabold pb-4 text-primary">Buttons</h2>
        <div className="flex flex-wrap gap-2 items-center">
          <button className="btn btn-accent rounded-full font-semibold">
            Button
          </button>
          <button className="btn btn-primary rounded-full font-semibold">
            Button
          </button>
          <button className="btn btn-outline rounded-full font-semibold">
            Button
          </button>
          <div className="tooltip" data-tip="Disabled">
            <button className="btn btn-disabled rounded-full font-semibold">
              Button
            </button>
          </div>
          <p>
            Note, the disabled button does not match the design a 100% here...
          </p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-extrabold text-primary">
          Bottom navigation assets
        </h2>
        <div className="flex flex-wrap gap-2 items-center"></div>
      </section>
      <section>
        <h2 className="text-2xl font-extrabold text-primary">Themes</h2>
        <div className="flex items-center gap-4">
          <div className="form-control">
            <label className="label cursor-pointer gap-4">
              <span className="label-text">Light</span>
              <input
                type="radio"
                name="theme-radios"
                className="radio theme-controller"
                value="milesLight"
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer gap-4">
              <span className="label-text">Dark</span>
              <input
                type="radio"
                name="theme-radios"
                className="radio theme-controller"
                value="milesDark"
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer gap-4">
              <span className="label-text">Svartedøden</span>
              <input
                type="radio"
                name="theme-radios"
                className="radio theme-controller"
                value="cyberpunk"
              />
            </label>
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-extrabold text-primary">
          Bottom navigation assets
        </h2>

        <div
          className="flex flex-wrap gap-4 m-4"
          // className="btm-nav"
          // className="flex gap-4 justify-center fixed bottom-0 w-full p-4 bg-base-100 border-t border-base-100 bg-opacity-90"
        >
          <div className="indicator">
            <span className="indicator-item badge badge-accent text-xl font-bold">
              !
            </span>
            <button className="btn btn-primary rounded-box flex flex-col items-center w-32 h-24 ">
              <svg
                width="27"
                height="26"
                viewBox="0 0 27 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.1039 10.8V5.6C26.1039 4.157 24.9339 3 23.5039 3H2.70388C1.27388 3 0.116882 4.157 0.116882 5.6V10.8C1.54688 10.8 2.70388 11.97 2.70388 13.4C2.70388 14.83 1.54688 16 0.103882 16V21.2C0.103882 22.63 1.27388 23.8 2.70388 23.8H23.5039C24.9339 23.8 26.1039 22.63 26.1039 21.2V16C24.6739 16 23.5039 14.83 23.5039 13.4C23.5039 11.97 24.6739 10.8 26.1039 10.8ZM14.4039 20.55H11.8039V17.95H14.4039V20.55ZM14.4039 14.7H11.8039V12.1H14.4039V14.7ZM14.4039 8.85H11.8039V6.25H14.4039V8.85Z"
                  fill="white"
                />
              </svg>
              <span className="btm-nav-label text-primary-content font-extrabold text-sm">
                Hyttetrekning
              </span>
            </button>
          </div>
          <button className="btn btn-primary rounded-box flex flex-col items-center w-32 h-24 ">
            <svg
              width="27"
              height="26"
              viewBox="0 0 27 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5039 24.1V16.3H15.7039V24.1H22.2039V13.7H26.1039L13.1039 2L0.103882 13.7H4.00388V24.1H10.5039Z"
                fill="white"
              />
            </svg>
            <span className="btm-nav-label text-primary-content font-extrabold text-sm">
              Om hytten
            </span>
          </button>
          <button className="btn btn-primary rounded-box flex flex-col items-center w-32 h-24 ">
            <svg
              width="27"
              height="26"
              viewBox="0 0 27 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.33447 16.8459C8.33872 16.8459 9.19233 16.4944 9.89531 15.7914C10.5983 15.0885 10.9498 14.2348 10.9498 13.2306C10.9498 12.2263 10.5983 11.3727 9.89531 10.6698C9.19233 9.96678 8.33872 9.6153 7.33447 9.6153C6.33022 9.6153 5.47661 9.96678 4.77364 10.6698C4.07066 11.3727 3.71918 12.2263 3.71918 13.2306C3.71918 14.2348 4.07066 15.0885 4.77364 15.7914C5.47661 16.4944 6.33022 16.8459 7.33447 16.8459ZM7.33447 20.4612C5.32597 20.4612 3.61875 19.7582 2.2128 18.3523C0.806856 16.9463 0.103882 15.2391 0.103882 13.2306C0.103882 11.2221 0.806856 9.51487 2.2128 8.10892C3.61875 6.70297 5.32597 6 7.33447 6C8.96136 6 10.3826 6.46195 11.5981 7.38586C12.8128 8.30977 13.6612 9.45462 14.1433 10.8204H23.7238C23.8845 10.8204 24.0404 10.8505 24.1914 10.9108C24.3416 10.971 24.467 11.0514 24.5674 11.1518L25.7424 12.3268C25.8629 12.4473 25.9532 12.5826 26.0135 12.7329C26.0738 12.8839 26.1039 13.0398 26.1039 13.2005C26.1039 13.3611 26.079 13.5118 26.0292 13.6524C25.9786 13.793 25.893 13.9235 25.7725 14.044L22.6392 17.1773C22.5187 17.2978 22.3882 17.3882 22.2476 17.4484C22.107 17.5087 21.9563 17.5388 21.7957 17.5388C21.635 17.5388 21.4843 17.5135 21.3437 17.4629C21.2031 17.4131 21.0726 17.3279 20.9521 17.2074L19.3855 15.6408L17.8188 17.2074C17.6983 17.3279 17.5678 17.4131 17.4272 17.4629C17.2866 17.5135 17.1359 17.5388 16.9753 17.5388C16.8146 17.5388 16.6639 17.5135 16.5233 17.4629C16.3828 17.4131 16.2522 17.3279 16.1317 17.2074L14.5651 15.6408H14.1433C13.6412 17.0869 12.7675 18.2518 11.5222 19.1356C10.2769 20.0193 8.88101 20.4612 7.33447 20.4612Z"
                fill="white"
              />
            </svg>
            <span className="btm-nav-label text-primary-content font-extrabold text-sm">
              Inn-/utsjekk
            </span>
          </button>
          <button className="btn btn-primary rounded-box flex flex-col items-center w-32 h-24 ">
            <svg
              width="27"
              height="26"
              viewBox="0 0 27 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.1036 13C16.1412 13 18.6036 10.5376 18.6036 7.5C18.6036 4.46243 16.1412 2 13.1036 2C10.0661 2 7.60364 4.46243 7.60364 7.5C7.60364 10.5376 10.0661 13 13.1036 13Z"
                fill="white"
              />
              <path
                d="M21.8901 16.5201C19.5801 15.3376 16.5826 14.3751 13.1039 14.3751C9.62513 14.3751 6.62763 15.3376 4.31763 16.5201C2.94263 17.2213 2.10388 18.6376 2.10388 20.1776V24.0001H24.1039V20.1776C24.1039 18.6376 23.2651 17.2213 21.8901 16.5201Z"
                fill="white"
              />
            </svg>
            <span className="btm-nav-label text-primary-content font-extrabold text-sm">
              Min hytteID
            </span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default ComponentsPage;
