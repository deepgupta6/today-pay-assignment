import sampleQuestions from "../data/sampleQuestions.json";
import { decodeHTMLEntities } from "../utils/decodeHTMLEntities";
import { shuffleArray } from "../utils/shuffleArray";

const buildApiUrl = (difficulty) =>
  `https://the-trivia-api.com/api/questions?limit=10&difficulty=${difficulty}`;

let useLocalData = false;

export const setUseLocalData = (value) => {
  useLocalData = value;
};

export const fetchQuestionsFromAPI = async (difficulty = "easy") => {
  if (useLocalData) {
    console.log("📂 Using local JSON data");
    return sampleQuestions.map((q) => ({
      ...q,
      question: decodeHTMLEntities(q.question),
      correct_answer: decodeHTMLEntities(q.correct_answer),
      options: shuffleArray([
        ...q.incorrect_answers.map(decodeHTMLEntities),
        decodeHTMLEntities(q.correct_answer),
      ]),
    }));
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-second timeout

  try {
    console.log(`🌍 Fetching from Trivia API (Difficulty: ${difficulty})`);
    const response = await fetch(buildApiUrl(difficulty), {
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const data = await response.json();
    if (data.length === 0) {
      throw new Error("API returned no questions for this difficulty.");
    }

    return data.map((q) => ({
      question: decodeHTMLEntities(q.question),
      correct_answer: decodeHTMLEntities(q.correctAnswer),
      options: shuffleArray([
        ...q.incorrectAnswers.map(decodeHTMLEntities),
        decodeHTMLEntities(q.correctAnswer),
      ]),
    }));
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn(`⚠️ API failed (${err.name}: ${err.message}), falling back to local data.`);
    return sampleQuestions.map((q) => ({
      ...q,
      question: decodeHTMLEntities(q.question),
      correct_answer: decodeHTMLEntities(q.correct_answer),
      options: shuffleArray([
        ...q.incorrect_answers.map(decodeHTMLEntities),
        decodeHTMLEntities(q.correct_answer),
      ]),
    }));
  }
};