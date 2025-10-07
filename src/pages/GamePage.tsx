import { Link } from "react-router-dom";
import circle from "../assets/circle.png";
import { useGame } from "../pages/GameProvider";
import x from "../assets/X.png";

export default function GamePage() {
    const { getCurrentPlayer, selectedLevel, currentRound, getGameInfo, getPlayerStats, getStatsFormatted, incrementAnswers } = useGame();
    const currentPlayer = getCurrentPlayer();
    const gameInfo = getGameInfo();
    const playerStats = getPlayerStats(currentPlayer.id);
    const allStats = getStatsFormatted();

    const handleAnswer = () => {
        incrementAnswers(currentPlayer.id);
    };

    return(
        <>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <Link to="/resultspage">
                    <img className="absolute top-0 left-0 pl-10 pt-10" src={x}/>
                </Link>

                <div className="bg-white/33 pl-8 pt-8 pr-8 pb-8 rounded-3xl mt-10">
                <div style={{display: "flex", flexDirection: "column", margin: 0}}>
                        <p 
                            className="font-black text-6xl text-white mt-3 leading-none" 
                            style={{ WebkitTextStroke: "2px white uppercase" }}
                            >
                             {currentPlayer.name.toUpperCase()}'S
                        </p>
                        <p className="font-extrabold text-6xl m-0 leading-none">turn</p>
                    </div>
                    <div style={{display: "flex", gap: "20px", justifyContent: "center"}} className="mt-10">
                        <div style={{display: "flex", gap: "10px"}} className="font-black text-4xl text-white" >
                            <p className="text-[#643DB8]">{playerStats.drinks}</p>
                            <p>drinks</p>
                        </div>
                        <div style={{display: "flex", gap: "10px"}} className="font-black text-4xl text-white">
                            <p className="text-[#643DB8]">{playerStats.answers}</p>
                            <p>answers</p>
                        </div>
                    </div>
                    <p className="font-black text-4xl text-white mt-15">
                        Level: {selectedLevel}
                    </p>
                </div>
                <div style={{ display: "flex", gap: "20px"}} className="mt-5">
                    <Link to="/waitingpage" onClick={handleAnswer}>
                        <div className="bg-[#643DB8] text-white font-bold px-12 py-4 rounded-xl text-4xl hover:bg-gray-100 transition-colors mt-5 pl-10 pr-10">Answer</div>
                    </Link>
                    <Link to="/drinkpage">
                        <div className="bg-white text-black font-bold px-12 py-4 rounded-xl text-4xl hover:bg-gray-100 transition-colors mt-5 pl-10 pr-10">Drink</div>
                    </Link>
                </div>
            </div>
        </>
    )
}