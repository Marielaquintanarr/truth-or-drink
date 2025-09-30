import './App.css'
import Homepage from './pages/Homepage';
import SelectLevelPage from './pages/SelectLevelPage';
import AddPlayersPage from './pages/AddPlayersPage';
import OptionsPage from './pages/OptionsPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/levels" element={<SelectLevelPage />} />
            <Route path="/players" element={<AddPlayersPage />} />
            <Route path="/options" element={<OptionsPage />} />
          </Routes>
        </Router>
    </>
  )
}

export default App
