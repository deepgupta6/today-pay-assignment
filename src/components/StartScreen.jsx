import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setUseLocalData } from "../api/triviaApi";
import { motion } from "framer-motion";
import { Trophy, Code, Cloud } from 'lucide-react';

const StartScreen = () => {
  const [useLocal, setUseLocal] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [highScore, setHighScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const savedHighScore = localStorage.getItem("quizHighScore") || 0;
    setHighScore(Number(savedHighScore));
  }, []);

  const handleToggle = () => {
    setUseLocal((prev) => {
      const newValue = !prev;
      setUseLocalData(newValue);
      return newValue;
    });
  };

  const handleStart = () => {
    navigate("/quiz", { state: { difficulty } });
  };

  const difficulties = ["easy", "medium", "hard"];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="text-center bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-2xl shadow-2xl w-full max-w-lg mx-auto"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-2">
        React Trivia Quiz
      </h1>
      <p className="text-lg text-gray-400 mb-6">
        Test your knowledge and chase the high score!
      </p>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-8 p-4 bg-gray-900/50 rounded-lg inline-flex items-center gap-3 text-2xl text-yellow-400 font-semibold"
      >
        <Trophy className="w-8 h-8" />
        High Score: {highScore}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-xl font-semibold text-gray-200 mb-4">Choose Difficulty</h2>
        <div className="flex justify-center space-x-2 md:space-x-4">
          {difficulties.map((level) => (
            <button
              key={level}
              onClick={() => setDifficulty(level)}
              className={`px-5 py-2 rounded-full font-medium capitalize transition-all duration-300 focus:outline-none focus:ring-4
                ${
                  difficulty === level
                    ? "bg-teal-500 text-white shadow-lg focus:ring-teal-500/50"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600 focus:ring-gray-600/50"
                }`}
            >
              {level}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Data Source Toggle */}
       <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mb-8 flex justify-center items-center"
      >
        <label className="inline-flex items-center cursor-pointer">
          <span className={`mr-3 font-medium ${useLocal ? 'text-gray-500' : 'text-teal-400'}`}>
            <Cloud className="inline w-5 h-5 mr-1" />
            API
          </span>
          <div className="relative">
            <input type="checkbox" checked={useLocal} onChange={handleToggle} className="sr-only peer" />
            <div className="w-14 h-8 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
          </div>
          <span className={`ml-3 font-medium ${useLocal ? 'text-blue-400' : 'text-gray-500'}`}>
            <Code className="inline w-5 h-5 mr-1" />
            Local
          </span>
        </label>
      </motion.div>


      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <button
          onClick={handleStart}
          className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-bold py-4 px-10 rounded-full shadow-lg text-lg transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
        >
          Start Quiz
        </button>
      </motion.div>
    </motion.div>
  );
};

export default StartScreen;

