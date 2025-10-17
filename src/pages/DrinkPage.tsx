import { Link } from "react-router-dom";
import circle from "../assets/circle.png";
import bacardi from "../assets/bacardiii.png";
import x from "../assets/X.png";
import { useGame } from "../pages/GameProvider";
import { useEffect, useState } from "react";

export default function DrinkPage() {
    const { getCurrentPlayer, incrementDrinks, selectedLevel, } = useGame();
    const currentPlayer = getCurrentPlayer();

    const [drinks, setDrinks] = useState<{ drink: string }[]>([]);


    const getEndpointByLevel = (selectedLevel: string | null) => {
        switch (selectedLevel) {
          case "Easy":
            return "http://localhost:8080/drinkEasy";
          case "Medium":
            return "http://localhost:8080/drinkMedium";
          case "Hard":
            return "http://localhost:8080/drinkHard";
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
            setDrinks(data);
          } catch (error) {
            console.error("Error al obtener datos:", error);
          }
        };
    
        fetchData();
      }, [selectedLevel]);
    
    const currentDrink = drinks.length > 0 
        ? drinks[Math.floor(Math.random() * drinks.length)].drink 
        : "Loading...";

    const handleNext = () => {
        incrementDrinks(currentPlayer.id);
    };
    return(
        <>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <img className="absolute top-0 z-20" src={circle} />
                <Link to="/resultspage" className="absolute top-4 left-4 z-50">
                    <img className="cursor-pointer hover:opacity-80 w-12 h-12" src={x} alt="Exit"/>
                </Link>
                
                <h1 
                        className="font-black text-8xl text-white mb-8 mt-5" 
                        style={{ WebkitTextStroke: "2px white" }}
                    >
                     {currentPlayer.name.toUpperCase()} DRINKS
                </h1>

                <div className="bg-white/33 pl-5 pt-5 pr-5 rounded-3xl mb-12 w-full max-w-2xl">
                    <h2 className="font-extrabold text-3xl m-0 leading-none text-center mb-7">
                        {currentDrink}
                    </h2>
                    <img src={bacardi} className="mx-auto block"/>
                </div>
                
                
                <Link to="/waitingpage" onClick={handleNext}>
                        <div 
                            className="bg-white text-black font-bold px-35 py-2 rounded-xl text-3xl hover:bg-gray-100 transition-colors"
                            onClick={handleNext}
                        >
                            Next
                        </div>
                </Link>

            </div>
        </>
    )
}