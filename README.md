# 🎮 React-Based Trivia Quiz Application

An **advanced trivia quiz application** built with **React** to deliver a **fun, interactive, and responsive user experience**.  
It features **clean UI, smooth animations, real-time API integration, and robust state management**.  

---

## ✨ Core Functionalities

### 🎲 Gameplay Mechanics
- 🔄 **Dynamic Retrieval of Questions**: Fetched in real-time from the public Trivia API.  
- 🎚️ **Configurable Difficulty Levels**: Choose between *Easy, Medium, and Hard*.  
- ⏱️ **Time-Constrained Questioning**: 30-second timer with color transitions *(green → yellow → red)*.  
- 🏆 **Performance Scoring**: Scores update immediately after each correct answer.  
- ⏭️ **Skip Feature**: Users can bypass questions they don’t want to answer.  
- 📊 **Comprehensive Results Summary**: Final score, percentage, and detailed review of all responses.  

### 🎨 User Interface & Experience Enhancements
- 📱 **Responsive UI**: Built with **Tailwind CSS** for a seamless multi-device experience.  
- 🎬 **Fluid Animations**: Powered by **Framer Motion** for smooth transitions & feedback.  
- ✅❌ **Visual Response Indicators**: Using **Lucide React icons** for correct/incorrect answers.  
- 🧭 **Optimized Layout Design**: Professional, intuitive, and easy to navigate.  

### ⚙️ Technical Specs & Error Handling
- 🔄 **API Fallback Mechanism**: Switches to local sample questions if API fails or times out (8s).  
- 🔀 **Selectable Data Source**: Users can toggle between **live API** and **local JSON data**.  
- 💾 **High Score Persistence**: Saved in **localStorage** for tracking best performances.  
- 🔁 **Session State Persistence**: Ongoing quiz progress restored via **sessionStorage** after refresh.  
- ⏳ **Asynchronous Loading States**: Clear loading indicators and error messages.  
- ♿ **Accessibility**: ARIA labels & live regions for screen reader compatibility.  

---

## 🛠️ Technology Stack
- ⚛️ **Framework**: React  
- 🧭 **Routing**: React Router  
- 🎨 **Styling**: Tailwind CSS  
- 🎬 **Animations**: Framer Motion  
- 🔔 **Icons**: Lucide React  
- ⚡ **Build Tool**: Vite  

---

## 🚀 Setup & Deployment Guide

### 📌 Prerequisites
Make sure you have installed:  
- [Node.js](https://nodejs.org/)  
- npm (comes with Node.js)  

### ⚡ Installation Steps
```bash
# 1️⃣ Clone Repository
git clone https://github.com/your-username/react-trivia-quiz.git
cd react-trivia-quiz

# 2️⃣ Install Dependencies
npm install

# 3️⃣ Run Development Server
npm run dev



Upon successful execution, the application will be accessible at http://localhost:5173 or an alternative port if the default is occupied.

📂 Project Directory Structure
```
/src
|-- /api
|   |-- triviaApi.js        # Manages API requests and fallback logic
|-- /assets                 # Contains static assets, such as images or fonts
|-- /components
|   |-- ErrorDisplay.jsx    # Renders error notification components
|   |-- Loader.jsx          # Renders the loading indicator component
|   |-- QuestionCard.jsx    # Renders the primary question and answer interface
|   |-- ResultsScreen.jsx   # Renders the final results summary
|   |-- StartScreen.jsx     # Renders the initial application welcome screen
|-- /data
|   |-- sampleQuestions.json # Contains local fallback question data
|-- /pages
|   |-- QuizApp.jsx         # The main component that orchestrates the quiz logic
|-- /utils
|   |-- decodeHTMLEntities.js # Utility for decoding HTML entities
|   |-- shuffleArray.js     # Utility for randomizing answer option order
|-- App.jsx                 # The root application component containing routing logic
|-- main.jsx                # The primary application entry point
|-- index.css               # Global stylesheet definitions
