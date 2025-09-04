import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchQuestionsFromAPI } from "../api/triviaApi";
import Loader from "../components/Loader";
import ErrorDisplay from "../components/ErrorDisplay";
import QuestionCard from "../components/QuestionCard";
import { motion, AnimatePresence } from "framer-motion";

const loadStateFromSession = () => {
  try {
    const serializedState = sessionStorage.getItem("quizState");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Could not load state from session storage", e);
    return undefined;
  }
};

function QuizApp() {
  const navigate = useNavigate();
  const location = useLocation();
  const difficulty = location.state?.difficulty || "easy";
  const savedState = loadStateFromSession();

  const [questions, setQuestions] = useState(savedState?.questions || []);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(savedState?.currentQuestionIndex || 0);
  const [userAnswers, setUserAnswers] = useState(savedState?.userAnswers || []);
  const [score, setScore] = useState(savedState?.score || 0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(savedState ? false : true);
  const [timer, setTimer] = useState(30);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    if (!loading && questions.length > 0 && !quizCompleted) {
      const stateToSave = { questions, currentQuestionIndex, userAnswers, score };
      sessionStorage.setItem("quizState", JSON.stringify(stateToSave));
    }
  }, [questions, currentQuestionIndex, userAnswers, score, loading, quizCompleted]);

  useEffect(() => {
    let isSubscribed = true;
    const loadQuestions = async () => {
      if (questions.length === 0) {
        try {
          const formattedQuestions = await fetchQuestionsFromAPI(difficulty);
          if (isSubscribed) setQuestions(formattedQuestions);
        } catch (err) {
          if (isSubscribed) setError(err.message);
        } finally {
          if (isSubscribed) setLoading(false);
        }
      }
    };
    if (loading) loadQuestions();
    return () => { isSubscribed = false; };
  }, [loading, difficulty, questions.length]);

  const handleAnswerSelect = (answer) => setSelectedAnswer(answer);

  const handleNextQuestion = useCallback(() => {
    const isCorrect = selectedAnswer === questions[currentQuestionIndex]?.correct_answer;
    if (isCorrect) setScore((prev) => prev + 1);
    
    setUserAnswers((prev) => [
      ...prev,
      {
        question: questions[currentQuestionIndex].question,
        userAnswer: selectedAnswer || "No Answer",
        correctAnswer: questions[currentQuestionIndex].correct_answer,
        isCorrect,
      },
    ]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setTimer(30);
    } else {
      setQuizCompleted(true);
    }
  }, [currentQuestionIndex, questions, selectedAnswer]);

  const handleSkipQuestion = useCallback(() => {
    setUserAnswers((prev) => [
      ...prev,
      {
        question: questions[currentQuestionIndex].question,
        userAnswer: "Skipped",
        correctAnswer: questions[currentQuestionIndex].correct_answer,
        isCorrect: false,
      },
    ]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setTimer(30);
    } else {
      setQuizCompleted(true);
    }
  }, [currentQuestionIndex, questions]);

  useEffect(() => {
    if (quizCompleted) {
      sessionStorage.removeItem("quizState");
      navigate("/results", {
        state: { score, results: userAnswers, totalQuestions: questions.length },
      });
    }
  }, [quizCompleted, navigate, score, userAnswers, questions.length]);

  useEffect(() => {
    if (loading || quizCompleted) return;
    if (timer === 0) {
      handleNextQuestion();
      return;
    }
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, loading, quizCompleted, handleNextQuestion]);

  const getTimerColor = () => {
    if (timer > 10) {
      return { bar: "bg-green-500", text: "text-green-400" };
    }
    if (timer > 5) {
      return { bar: "bg-yellow-500", text: "text-yellow-400" };
    }
    return { bar: "bg-red-500", text: "text-red-400" };
  };

  if (loading) return <Loader />;
  if (error) return <ErrorDisplay message={error} />;
  if (!questions || questions.length === 0) return <ErrorDisplay message="No questions loaded." />;

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const timerProgress = (timer / 30) * 100;
  const timerColor = getTimerColor();

  return (
    <div className="w-full">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl"
      >
        <div className="flex justify-between items-center mb-2 text-gray-300 font-medium">
          <span className="text-lg">
            Question <span className="text-xl font-bold text-teal-300">{currentQuestionIndex + 1}</span> of {questions.length}
          </span>
          <span className="text-lg">
            Score: <span className="text-xl font-bold text-teal-300">{score}</span>
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-teal-400 h-2.5 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          ></motion.div>
        </div>
        <div className="flex justify-end items-center mt-3">
            <div className="w-24 bg-gray-700 rounded-full h-2 mr-2">
                <motion.div 
                    className={`${timerColor.bar} h-2 rounded-full`}
                    initial={{width: "100%"}}
                    animate={{width: `${timerProgress}%`}}
                    transition={{duration: 1, ease: "linear"}}
                ></motion.div>
            </div>
             <span className={`font-mono text-sm ${timerColor.text}`}>{timer}s</span>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-full"
        >
          <QuestionCard
            questionData={questions[currentQuestionIndex]}
            onAnswerSelect={handleAnswerSelect}
            onNext={handleNextQuestion}
            onSkip={handleSkipQuestion}
            selectedAnswer={selectedAnswer}
            isLastQuestion={currentQuestionIndex === questions.length - 1}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default QuizApp;

