import { Link, LoaderFunction } from "react-router-dom";
import { json, useLoaderData } from "@remix-run/react";

// Assuming 'Draw' is a type representing a draw
// If 'Draw' is not defined, replace it with the correct type
type Draw = {
  id: string;
  title: string;
};

export const loader: LoaderFunction = async () => {
  // const response = await fetch("/api/draws");
  // const draws: Draw[] = await response.json();
  const draws: Draw[] = [
    { id: "1", title: "Draw 1" },
    { id: "2", title: "Draw 2" },
  ];
  return json(draws);
};

export default function Draws_index() {
  const draws: Draw[] = useLoaderData();

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1>Draws Overview</h1>
      <Link to="/draws/new" className="link">
        Create New Draw
      </Link>
      <ul>
        {draws.map((draw: Draw) => (
          <li key={draw.id} className="flex gap-4 items-center">
            <p>{draw.title}</p>
            <Link to={`/draws/${draw.id}/edit`} className="link">
              Edit
            </Link>
            <button
              className="btn btn-ghost"
              onClick={() => deleteDraw(draw.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

async function deleteDraw(id: string) {
  // await fetch(`/api/draws/${id}`, { method: "DELETE" });
  window.location.reload();
}
