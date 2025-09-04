import { motion } from "framer-motion";
import { CheckCircle, XCircle } from 'lucide-react';

const QuestionCard = ({ questionData, onAnswerSelect, onNext, onSkip, selectedAnswer, isLastQuestion }) => {
  const { question, options, correct_answer } = questionData;

  const getButtonClass = (option) => {
    if (!selectedAnswer) {
      return "bg-gray-700 border-gray-600 hover:bg-gray-600 hover:border-teal-400";
    }
    if (option === selectedAnswer) {
      return option === correct_answer 
        ? "bg-green-500/80 border-green-400 ring-4 ring-green-500/30" 
        : "bg-red-500/80 border-red-400 ring-4 ring-red-500/30";
    }
    if (option === correct_answer) {
        return "bg-green-500/80 border-green-400";
    }
    return "bg-gray-700 border-gray-600 opacity-50 cursor-not-allowed";
  };
  
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-6 md:p-8 rounded-2xl shadow-2xl w-full">
      <h2 
        className="text-xl md:text-2xl font-semibold text-gray-100 mb-8 leading-relaxed" 
        dangerouslySetInnerHTML={{ __html: question }} 
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => (
          <motion.button
            key={option}
            onClick={() => onAnswerSelect(option)}
            disabled={!!selectedAnswer}
            whileHover={{ scale: selectedAnswer ? 1 : 1.03 }}
            whileTap={{ scale: selectedAnswer ? 1 : 0.98 }}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-300 font-medium text-gray-200
              ${getButtonClass(option)}`}
          >
            <div className="flex justify-between items-center">
              <span dangerouslySetInnerHTML={{ __html: option }} />
              {selectedAnswer && option === selectedAnswer && option === correct_answer && (
                <motion.div initial={{scale: 0.5}} animate={{scale: 1}}><CheckCircle className="w-6 h-6 text-white" /></motion.div>
              )}
              {selectedAnswer && option === selectedAnswer && option !== correct_answer && (
                <motion.div initial={{scale: 0.5}} animate={{scale: 1}}><XCircle className="w-6 h-6 text-white" /></motion.div>
              )}
              {selectedAnswer && option !== selectedAnswer && option === correct_answer && (
                 <motion.div initial={{scale: 0.5}} animate={{scale: 1}}><CheckCircle className="w-6 h-6 text-white opacity-70" /></motion.div>
              )}
            </div>
          </motion.button>
        ))}
      </div>
      <div className="mt-8 flex justify-between items-center h-12">
        <div>
          {!selectedAnswer && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onSkip}
              className="bg-gray-700 hover:bg-gray-600 text-gray-200 font-bold py-3 px-8 rounded-full shadow-md"
            >
              Skip
            </motion.button>
          )}
        </div>
        <div className="text-right">
          {selectedAnswer && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={onNext}
              className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-bold py-3 px-8 rounded-full shadow-lg"
            >
              {isLastQuestion ? 'View Results' : 'Next Question'}
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;

