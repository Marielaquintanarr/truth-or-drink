import { Link  } from "react-router-dom";
import circle from "../assets/circle.png";
import shot from "../assets/shot.png";
import text from "../assets/text.png";
import { useGame } from "../pages/GameProvider";

export default function ResultsPage() {
    const { getStatsFormatted, resetGame } = useGame();

    const allStats = getStatsFormatted();

    console.log('Estadísticas actuales:', allStats);

    // top answers
    const topAnswers = Object.entries(allStats).reduce((max, [name, [answers]]) => {
        return answers > max.answers ? { name, answers } : max;
    }, { name: "", answers: 0 });
    
    // top drinks
    const topDrinks = Object.entries(allStats).reduce((max, [name, [drinks]]) => {
        return drinks > max.drinks ? { name, drinks } : max;
    }, { name: "", drinks: 0 });

    const handlePlayAgain = () => {
        resetGame();
    };

    return(
        <>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <img className="absolute top-0 z-20" src={circle} />
                
                <div className="mt-6 text-center">
                    <h1 
                        className="font-black text-8xl text-white mb-8" 
                        style={{ WebkitTextStroke: "2px white" }}
                    >
                        RESULTS
                    </h1>
                </div>

                <div className="flex gap-4 mb-8">
                    <div className="bg-white/33 p-6 rounded-3xl flex flex-col justify-between">
                        <p className="text-white font-bold text-xl">More honest</p>
                        <p className="text-white text-xl">{topAnswers.name}</p>
                        <p className="text-white font-black text-5xl">{topAnswers.answers}</p>
                    </div>
                    
                    <div className="bg-white/33 p-6 rounded-3xl flex flex-col justify-between">
                        <p className="text-white font-bold text-xl">More drinks</p>
                        <p className="text-white text-xl">{topDrinks.name}</p>
                        <p className="text-white font-black text-5xl">{topDrinks.drinks}</p>
                    </div>
                </div>

                <div className="bg-white/33 p-8 rounded-3xl mb-8 w-full max-w-2xl">
                    <h2 className="font-extrabold text-5xl text-white text-left mb-5">Ranking</h2>

                    <div className="space-y-4 mb-5">
                        {Object.entries(allStats)
                        .map(([name, [answers, drinks]]) => ({ name, answers, drinks }))
                        .sort((a, b) => b.answers - a.answers) 
                        .map((player, index) => (
                            <div key={player.name} className="bg-white rounded-xl p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <span className="font-bold text-xl text-black">{index + 1}</span>
                                <span className="font-bold text-xl text-black">{player.name}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                <img src={text} className="w-7" />
                                <span className="text-black font-bold">{player.answers}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                <img src={shot} className="w-5"/>
                                <span className="text-black font-bold">{player.drinks}</span>
                                </div>
                            </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Link to="/" onClick={handlePlayAgain}>
                    <div className="bg-white text-black font-bold px-12 py-4 rounded-xl text-xl hover:bg-gray-100 transition-colors">Play Again</div>
                </Link>
            </div>
        </>
    )
}