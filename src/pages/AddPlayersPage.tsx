import { Link } from "react-router-dom";

export default function AddPlayersPage() {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold">ADD</h1>
        <h1 className="text-4xl font-bold">PLAYERS</h1>
        <Link to="/options"> START GAME</Link>
      </div>
    );
  }
  