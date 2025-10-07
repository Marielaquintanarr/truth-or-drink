import './App.css'
import Homepage from './pages/Homepage';
import ResultsPage from './pages/ResultsPage';
import GamePage from './pages/GamePage';
import DrinkPage from './pages/DrinkPage';
import WaitingPage from './pages/WaitingPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GameProvider } from './pages/GameProvider';

function App() {
  return (
    <GameProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/gamepage" element={<GamePage />} />
          <Route path="/drinkpage" element={<DrinkPage />} />
          <Route path="/waitingpage" element={<WaitingPage />} />
          <Route path="/resultspage" element={<ResultsPage />} />
        </Routes>
      </Router>
    </GameProvider>
  );
}


export default App;