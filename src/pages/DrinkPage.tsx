import { Link } from "react-router-dom";
import circle from "../assets/circle.png";
import bacardi from "../assets/bacardiii.png";
import x from "../assets/X.png";
import { useGame } from "../pages/GameProvider";
import { useEffect, useState } from "react";

export default function DrinkPage() {
    const { getCurrentPlayer, incrementDrinks } = useGame();
    const currentPlayer = getCurrentPlayer();
    const [drinkCountdown, setDrinkCountdown] = useState(5);
    const [showNextButton, setShowNextButton] = useState(false);
    const [hasCountedDrink, setHasCountedDrink] = useState(false);

    useEffect(() => {
        if (drinkCountdown > 0) {
            const timer = setTimeout(() => {
                setDrinkCountdown(drinkCountdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            // Cuando termine el countdown, contar la bebida y mostrar el botón
            if (!hasCountedDrink) {
                incrementDrinks(currentPlayer.id);
                setHasCountedDrink(true);
            }
            setShowNextButton(true);
        }
    }, [drinkCountdown, hasCountedDrink, incrementDrinks, currentPlayer.id]);

    const handleNext = () => {
    };
    return(
        <>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <img className="absolute top-0 z-20" src={circle} />
                <Link to="/resultspage" className="absolute top-4 left-4 z-50">
                    <img className="cursor-pointer hover:opacity-80 w-12 h-12" src={x} alt="Exit"/>
                </Link>
                
                <h1 
                        className="font-black text-8xl text-white mb-8" 
                        style={{ WebkitTextStroke: "2px white" }}
                    >
                     {currentPlayer.name.toUpperCase()} DRINKS
                </h1>

                <div className="bg-white/33 pl-8 pt-8 pr-8 rounded-3xl mb-12 w-full max-w-2xl">
                    <h2 className="font-extrabold text-4xl m-0 leading-none text-center mb-7">
                        {drinkCountdown > 0 ? `Take a ${drinkCountdown} second shot` : "Shot completed!"}
                    </h2>
                    <img src={bacardi} className="mx-auto block"/>
                </div>
                
                {showNextButton && (
                    <Link to="/waitingpage">
                        <div 
                            className="bg-white text-black font-bold px-35 py-2 rounded-xl text-3xl hover:bg-gray-100 transition-colors"
                            onClick={handleNext}
                        >
                            Next
                        </div>
                    </Link>
                )}
            </div>
        </>
    )
}