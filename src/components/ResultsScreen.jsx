import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

const ResultsScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { score = 0, totalQuestions = 0, results = [] } = location.state || {};

  useEffect(() => {
    const savedHighScore = localStorage.getItem("quizHighScore") || 0;
    if (score > savedHighScore) {
      localStorage.setItem("quizHighScore", score.toString());
    }
  }, [score]);

  const handleRestart = () => {
    navigate("/");
  };

  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  
  const getPerformanceMessage = () => {
    if (percentage === 100) return "Perfect Score! You're a genius!";
    if (percentage >= 80) return "Excellent Work! Truly impressive.";
    if (percentage >= 50) return "Good Job! You're on the right track.";
    return "Keep trying! Practice makes perfect.";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto text-center"
    >
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300 mb-2">
          Quiz Completed!
        </h1>
        <p className="text-lg text-teal-300 mb-6">{getPerformanceMessage()}</p>
        
        <div className="flex justify-around items-center my-8">
            <div className="text-center">
                <p className="text-gray-400">Score</p>
                <p className="text-4xl font-bold text-white">{score}</p>
            </div>
             <div className="text-center">
                <p className="text-gray-400">Percentage</p>
                <p className="text-4xl font-bold text-white">{percentage}%</p>
            </div>
             <div className="text-center">
                <p className="text-gray-400">Correct</p>
                <p className="text-4xl font-bold text-white">{score}/{totalQuestions}</p>
            </div>
        </div>

        <div className="bg-gray-900/70 rounded-lg p-6 text-left mb-8">
          <h2 className="text-2xl font-semibold text-gray-200 mb-4">Review Your Answers</h2>
          <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
            {results.map((res, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`p-4 rounded-lg border-l-4 ${
                  res.isCorrect ? "border-green-400 bg-green-500/10" : "border-red-400 bg-red-500/10"
                }`}
              >
                <p className="font-medium text-gray-300" dangerouslySetInnerHTML={{ __html: `Q${idx + 1}: ${res.question}` }} />
                <p className="text-sm text-gray-400 mt-1">
                  Your Answer:{" "}
                  <span className={`font-semibold ${res.isCorrect ? "text-green-400" : "text-red-400"}`}
                    dangerouslySetInnerHTML={{ __html: res.userAnswer }}
                  />
                </p>
                {!res.isCorrect && (
                  <p className="text-sm text-gray-400">
                    Correct Answer:{" "}
                    <span className="font-semibold text-green-400" dangerouslySetInnerHTML={{ __html: res.correctAnswer }} />
                  </p>
                )}
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRestart}
          className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-bold py-3 px-8 rounded-full shadow-lg"
        >
          Play Again
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ResultsScreen;
