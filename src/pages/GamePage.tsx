import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGame } from "../pages/GameProvider";
import x from "../assets/X.png";

export default function GamePage() {
    const { getCurrentPlayer, selectedLevel, getPlayerStats, incrementAnswers } = useGame();
    const currentPlayer = getCurrentPlayer();
    const playerStats = getPlayerStats(currentPlayer.id);

    const [questions, setQuestions] = useState<{ tell: string }[]>([]);

    const getEndpointByLevel = (selectedLevel: string | null) => {
        switch (selectedLevel) {
          case "Easy":
            return "http://localhost:8080/tellEasy";
          case "Medium":
            return "http://localhost:8080/tellMedium";
          case "Hard":
            return "http://localhost:8080/tellHard";
          default:
            return null;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
          const endpoint = getEndpointByLevel(selectedLevel);
          if (!endpoint) return;
    
          try {
            const res = await fetch(endpoint);
            const data = await res.json();
            setQuestions(data);
          } catch (error) {
            console.error("Error al obtener datos:", error);
          }
        };
    
        fetchData();
      }, [selectedLevel]);
    
      const currentQuestion = questions.length > 0 
        ? questions[Math.floor(Math.random() * questions.length)].tell 
        : "Loading...";

    const handleAnswer = () => {
        incrementAnswers(currentPlayer.id);
    };

    return(
        <>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <Link to="/resultspage">
                    <img className="absolute top-0 left-0 pl-10 pt-10" src={x}/>
                </Link>

                <div className="bg-white/33 pl-5 pt-5 pr-5 pb-5 rounded-3xl mt-10">
                <div style={{display: "flex", flexDirection: "column", margin: 0}}>
                        <p 
                            className="font-black text-5xl text-white mt-3 leading-none" 
                            style={{ WebkitTextStroke: "2px white uppercase" }}
                            >
                             {currentPlayer.name.toUpperCase()}'S
                        </p>
                        <p className="font-extrabold text-5xl m-0 leading-none">turn</p>
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
                    <p className="font-bold text-3xl text-white mt-2">{currentQuestion}</p>
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