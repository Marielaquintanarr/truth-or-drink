import { createContext, useContext, useState } from 'react';
import type { ReactNode } from "react";

interface GameContextType {
    players: any[];
    selectedLevel: string | null;
    addPlayer: (name: string) => void;
    removePlayer: (id: number) => void;
    updatePlayerName: (id: number, name: string) => void;
    selectLevel: (level: string) => void;
    getCurrentPlayer: () => any;
    getNextPlayer: () => any;
    incrementAnswers: (playerId: number) => void;
    incrementDrinks: (playerId: number) => void;
    getPlayerStats: (playerId: number) => any;
    getStatsFormatted: () => Record<string, [number, number]>;
    getGameInfo: () => any;
    resetGame: () => void;
    nextPlayer: any;
  }

  
const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
      throw new Error("useGame must be used within a GameProvider");
    }
    return context;
  };
  

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [players, setPlayers] = useState([
        { id: 1, name: "" },
        { id: 2, name: "" }
    ]);
    
    const [selectedLevel, setSelectedLevel] = useState("Easy");
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [currentRound, setCurrentRound] = useState(1);
    
    // Sistema de estadísticas: { playerId: { answers: number, drinks: number } }
    const [playerStats, setPlayerStats] = useState<Record<string, { answers: number; drinks: number }>>({});

    const addPlayer = () => {
        const newPlayer = {
            id: players.length + 1,
            name: ""
        };
        setPlayers([...players, newPlayer]);
    };

    const removePlayer = (id : number) => {
        setPlayers(players.filter(player => player.id !== id));
    };

    const updatePlayerName = (id : number, name : string) => {
        setPlayers(players.map(player => 
            player.id === id ? { ...player, name } : player
        ));
    };

    const initializePlayerStats = (playerId : number) => {
        if (!playerStats[playerId]) {
            setPlayerStats(prev => ({
                ...prev,
                [playerId]: { answers: 0, drinks: 0 }
            }));
        }
    };

    const incrementAnswers = (playerId : number) => {
        initializePlayerStats(playerId);
        setPlayerStats(prev => ({
            ...prev,
            [playerId]: {
                ...prev[playerId],
                answers: (prev[playerId]?.answers || 0) + 1
            }
        }));
    };

    const incrementDrinks = (playerId : number) => {
        initializePlayerStats(playerId);
        setPlayerStats(prev => ({
            ...prev,
            [playerId]: {
                ...prev[playerId],
                drinks: (prev[playerId]?.drinks || 0) + 1
            }
        }));
    };

    const getPlayerStats = (playerId : number) => {
        return playerStats[playerId] || { answers: 0, drinks: 0 };
    };

    const getAllStats = () => {
        return playerStats;
    };

    const getStatsFormatted = () => {
        const formattedStats: Record<string, [number, number]> = {};
        players.forEach(player => {
            if (player.name) { // Solo incluir jugadores con nombre
                const stats = getPlayerStats(player.id);
                formattedStats[player.name.toLowerCase()] = [stats.answers, stats.drinks];
            }
        });
        return formattedStats;
    };

    const selectLevel = (level : string) => {
        setSelectedLevel(level);
    };

    const nextPlayer = () => {
        setCurrentPlayerIndex((prevIndex) => {
            const newIndex = (prevIndex + 1) % players.length;
            // Si volvemos al primer jugador (después del último), incrementamos la ronda
            if (newIndex === 0 && prevIndex === players.length - 1) {
                setCurrentRound(prev => prev + 1);
            }
            return newIndex;
        });
    };

    const getCurrentPlayer = () => {
        return players[currentPlayerIndex];
    };

    const getNextPlayer = () => {
        const nextIndex = (currentPlayerIndex + 1) % players.length;
        return players[nextIndex];
    };

    // Función para debug - mostrar información del estado actual
    const getGameInfo = () => {
        return {
            currentPlayer: getCurrentPlayer(),
            nextPlayer: getNextPlayer(),
            currentPlayerIndex,
            currentRound,
            totalPlayers: players.length
        };
    };

    const resetGame = () => {
        setCurrentPlayerIndex(0);
        setCurrentRound(1);
        setPlayers([
            { id: 1, name: "" },
            { id: 2, name: "" }
        ]);
        setSelectedLevel("Easy");
        setPlayerStats({}); 
    };

    const value = {
        players,
        selectedLevel,
        currentPlayerIndex,
        currentRound,
        playerStats,
        addPlayer,
        removePlayer,
        updatePlayerName,
        selectLevel,
        nextPlayer,
        getCurrentPlayer,
        getNextPlayer,
        getGameInfo,
        incrementAnswers,
        incrementDrinks,
        getPlayerStats,
        getAllStats,
        getStatsFormatted,
        resetGame,
        setPlayers,
        setSelectedLevel
    };

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
};