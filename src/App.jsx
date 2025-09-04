import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizApp from "./pages/QuizApp";
import ResultsScreen from "./components/ResultsScreen";
import StartScreen from "./components/StartScreen";

function App() {
  return (
    <main className="font-sans min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4 text-white">
      <div className="w-full max-w-2xl mx-auto">
        <Router>
          
          <Routes>
            <Route path="/" element={<StartScreen />} />
            <Route path="/quiz" element={<QuizApp />} />
            <Route path="/results" element={<ResultsScreen />} />
          </Routes>
        </Router>
      </div>
    </main>
  );
}

export default App;
