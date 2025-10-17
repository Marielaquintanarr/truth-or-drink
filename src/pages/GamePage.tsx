import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGame } from "../pages/GameProvider";
import x from "../assets/X.png";

export default function GamePage() {
  const { getCurrentPlayer, selectedLevel, getPlayerStats, incrementAnswers } = useGame();
  const currentPlayer = getCurrentPlayer();
  const playerStats = getPlayerStats(currentPlayer.id);

  // ✅ Estados mejor organizados
  const [questions, setQuestions] = useState<{ tell: string }[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getEndpointByLevel = (selectedLevel: string | null) => {
    switch (selectedLevel) {
      case "Easy":
        return "https://truth-or-drink-backend.onrender.com/tellEasy";
      case "Medium":
        return "https://truth-or-drink-backend.onrender.com/tellMedium";
      case "Hard":
        return "https://truth-or-drink-backend.onrender.com/tellHard";
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

        const randomIndex = Math.floor(Math.random() * data.length);
        setCurrentQuestion(data[randomIndex].tell);

        setIsLoading(false);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, [selectedLevel]);

  const getNewQuestion = () => {
    if (questions.length > 0) {
      const randomIndex = Math.floor(Math.random() * questions.length);
      setCurrentQuestion(questions[randomIndex].tell);
    }
  };

  const handleAnswer = () => {
    incrementAnswers(currentPlayer.id);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Link to="/resultspage">
          <img className="absolute top-0 left-0 pl-10 pt-10" src={x} />
        </Link>

        <div className="bg-white/33 pl-5 pt-5 pr-5 pb-5 rounded-3xl mt-10">
          <div style={{ display: "flex", flexDirection: "column", margin: 0 }}>
            <p
              className="font-black text-4xl text-white mt-3 leading-none"
              style={{ WebkitTextStroke: "2px white uppercase" }}
            >
              {currentPlayer.name.toUpperCase()}'S
            </p>
            <p className="font-extrabold text-4xl m-0 leading-none">turn</p>
          </div>

          <div style={{ display: "flex", gap: "20px", justifyContent: "center" }} className="mt-10">
            <div style={{ display: "flex", gap: "10px" }} className="font-black text-3xl text-white">
              <p className="text-[#643DB8]">{playerStats.drinks}</p>
              <p>drinks</p>
            </div>
            <div style={{ display: "flex", gap: "10px" }} className="font-black text-3xl text-white">
              <p className="text-[#643DB8]">{playerStats.answers}</p>
              <p>answers</p>
            </div>
          </div>

          {isLoading ? (
            <p className="font-bold text-2xl text-white mt-2">Loading...</p>
          ) : (
            <p className="font-bold text-2xl text-white mt-2">{currentQuestion}</p>
          )}

          <p className="font-black text-3xl text-white mt-15">
            Level: {selectedLevel}
          </p>
        </div>

        <div style={{ display: "flex", gap: "20px" }} className="mt-5">
          <Link to="/waitingpage" onClick={() => { handleAnswer(); getNewQuestion(); }}>
            <div className="bg-[#643DB8] text-white font-bold px-10 py-4 rounded-xl text-3xl hover:bg-gray-100 transition-colors mt-5 pl-8 pr-8">
              Answer
            </div>
          </Link>
          <Link to="/drinkpage">
            <div className="bg-white text-black font-bold px-10 py-4 rounded-xl text-3xl hover:bg-gray-100 transition-colors mt-5 pl-8 pr-8">
              Drink
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
