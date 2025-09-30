import { Link } from "react-router-dom";

export default function SelectLevelPage() {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold">SELECT</h1>
        <h1 className="text-4xl font-bold">LEVEL</h1>
  
        <div className="flex flex-col gap-4 w-64">
          <Link to="/players"className="bg-[#37431c] text-white px-4 py-4 rounded" style={{backgroundColor: "#37431c"}}>
            EASY
          </Link>
          <Link to="/players" className="bg-[#FFB835] text-white px-4 py-2 rounded" style={{backgroundColor: "#FFB835"}}>
            MEDIUM
          </Link>
          <Link to="/players" className="bg-[#580101] text-white px-4 py-2 rounded" style={{backgroundColor: "#580101"}}>
            HARD
          </Link>
        </div>
      </div>
    );
  }
  