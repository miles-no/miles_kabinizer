import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Henry's Remix PWA Starter" },
    {
      name: "description",
      content: "An opinionated PWA template composed by Henry",
    },
  ];
};

export default function Index() {
  return (
    <div className="pl-4 pr-4 flex-col flex gap-4">
      <h1 className="text-2xl">Hytte.ro - dev</h1>
      <h2>Links</h2>
      <ul>
        <li>
          <Link className="link" to="/components">
            Components
          </Link>
          <Link className="link" to="draws/new">
            Add a New Draw
          </Link>
        </li>
      </ul>
    </div>
  );
}
