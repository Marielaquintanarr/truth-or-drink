import { Link } from "react-router-dom";
import circle from "../assets/circle.png";
import { useGame } from "../pages/GameProvider";
import { useEffect, useState } from "react";

export default function WaitingPage() {
    const { getNextPlayer, nextPlayer } = useGame();
    const [countdown, setCountdown] = useState(3);
    const nextPlayerData = getNextPlayer();

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <img className="absolute top-0 z-20" src={circle} />
                <div style={{display: "flex", gap: "3px", flexDirection: "column"}}>   
                    <p 
                        className="font-black text-6xl text-white, mt-10" 
                        style={{ WebkitTextStroke: "2px white" }}
                        >
                        NEXT PLAYER 
                    </p>
                    <p className="font-extrabold text-5xl mt-10">is</p>
                    <p className="font-black text-6xl text-white mt-10" 
                        style={{ WebkitTextStroke: "2px white" }}>{nextPlayerData.name.toUpperCase()}</p>
                </div>
                
                <div className="mt-10">
                    <p className="font-extrabold text-8xl text-white">{countdown}</p>
                </div>

                {countdown === 0 && (
                    <Link to="/gamepage">
                        <div 
                            className="bg-white text-black font-bold px-12 py-4 rounded-xl text-4xl hover:bg-gray-100 transition-colors mt-5"
                            onClick={nextPlayer}
                        >
                            Start Turn
                        </div>
                    </Link>
                )}
            </div>
        </>
    )
}