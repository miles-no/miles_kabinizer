import { Link } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div>
        <h1>Root</h1>
        <nav>
          <ul>
            <li>
              <Link to="/torje">Torje</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/select-periods">Select periods</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/gallery">Gallery</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
