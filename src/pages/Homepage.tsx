import { Link } from "react-router-dom";
import circle from "../assets/circle.png";
import { useGame } from "../pages/GameProvider";

export default function Homepage() {
    const { 
        players, 
        selectedLevel, 
        addPlayer, 
        removePlayer, 
        updatePlayerName, 
        selectLevel 
    } = useGame();

    return(
        <>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <img className="absolute top-0 z-20" src={circle} />
                <div style={{display: "flex", gap: "1px", flexDirection: "column",}}>   
                    <p 
                        className="font-black text-6xl text-white,m-0, mt-10" 
                        style={{ WebkitTextStroke: "2px white"}}
                        >
                        TRUTH
                    </p>

                    <p className="font-extrabold text-5xl  m-0">or</p>
                    <p className="font-black text-6xl text-white m-0" 
                        style={{ WebkitTextStroke: "2px white" }}>DRINK</p>
                </div>
        
                <div className="bg-white/33 pl-6 pt-6 pr-6 pb-6 rounded-3xl mt-10">
                    <p className="font-extrabold text-7xl ml-0 mb-10 mt-0 text-left">Players</p>
                    <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                        {players.map((player) => (
                            <div key={player.id} style={{display: "flex", gap: "10px", alignItems: "center"}}>
                                <input
                                    type="text"
                                    className="border rounded-[2vw] text-2xl"
                                    placeholder={` Player ${player.id}...`}
                                    value={player.name}
                                    onChange={(e) => updatePlayerName(player.id, e.target.value)}
                                />
                                {players.length > 1 && (
                                    <button
                                        onClick={() => removePlayer(player.id)}
                                        className="text-white font-bold rounded-xl text-xl hover:bg-red-600 transition-colors"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        ))}
                        <div 
                            className="bg-white text-black font-bold rounded-xl text-2xl hover:bg-gray-100 transition-colors mt-5 cursor-pointer"
                            onClick={() => addPlayer}
                        >
                            Add Player
                        </div>
                    </div>

                    <p className="font-extrabold text-7xl ml-0 text-left mt-10 mb-5">Level</p>
                    <div style={{display: "flex", gap: "10px", justifyContent: "center"}} className="mb-10">
                        <div 
                            className={` rounded-[2vw] text-2xl flex items-center justify-center cursor-pointer px-1 transition-all duration-200 ${
                                selectedLevel === "Easy" 
                                    ? "bg-[#158A00] shadow-lg scale-105 border-2 border-white" 
                                    : "bg-[#158A00] opacity-70 hover:opacity-100"
                            }`}
                            onClick={() => selectLevel("Easy")}
                        >
                            <p>Easy</p>
                        </div>
                        <div 
                            className={` rounded-[2vw] text-2xl flex items-center justify-center cursor-pointer px-1 transition-all duration-200 ${
                                selectedLevel === "Medium" 
                                    ? "bg-[#C96800] shadow-lg scale-105 border-2 border-white" 
                                    : "bg-[#C96800] opacity-70 hover:opacity-100"
                            }`}
                            onClick={() => selectLevel("Medium")}
                        >
                            <p>Medium</p>
                        </div>
                        <div 
                            className={`rounded-[2vw] text-2xl flex items-center justify-center cursor-pointer px-1 transition-all duration-200 ${
                                selectedLevel === "Hard" 
                                    ? "bg-[#9B0000] shadow-lg scale-105 border-2 border-white" 
                                    : "bg-[#9B0000] opacity-70 hover:opacity-100"
                            }`}
                            onClick={() => selectLevel("Hard")}
                        >
                            <p>Hard</p>
                        </div>
                    </div>
                    <Link to="/gamepage">
                        <div className="bg-white text-black font-bold rounded-xl text-2xl hover:bg-gray-100 transition-colors">Start Game</div>
                    </Link>
                </div>
            </div>
        </>
    )
}