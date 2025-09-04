React-Based Trivia Quiz Application
This document provides a comprehensive overview of an advanced trivia quiz application developed utilizing the React framework. The project is engineered to deliver a sophisticated and interactive user experience, underscored by a clean user interface, fluid animations, and robust state management protocols.

(Note: It is recommended to replace the URL above with a link to a screenshot of the application.)

✨ Core Functionalities
The application is equipped with a comprehensive suite of features designed to ensure robustness, user-friendliness, and operational resilience.

Gameplay Mechanics
Dynamic Retrieval of Questions: Questions are dynamically fetched in real-time from the public Trivia API.

Configurable Difficulty Levels: Users are provided with the option to select from multiple difficulty tiers—specifically Easy, Medium, and Hard—to customize the level of challenge.

Time-Constrained Questioning: Each question is accompanied by a 30-second response timer. The visual representation of the timer transitions in color from green to yellow and subsequently to red to indicate diminishing time.

Performance Scoring: The user's score is incrementally updated upon the submission of each correct answer.

Question Omission Capability: The application permits users to bypass any question they elect not to answer.

Comprehensive Results Summary: Upon completion of the quiz, a detailed results screen is presented, which displays the final score, the calculated percentage of correct answers, and a review of all submitted responses.

User Interface and Experience Enhancements
Contemporary and Responsive User Interface: The interface has been constructed with Tailwind CSS to ensure a clean, responsive design that maintains integrity across a wide range of devices and screen dimensions.

Fluid User Interface Animations: Leveraging the Framer Motion library, the user interface incorporates fluid animations for question transitions, interactive element feedback, and asynchronous loading states.

Visual Response Indicators: Icons from the Lucide React library are utilized to provide immediate and unambiguous visual confirmation for both correct and incorrect answer selections.

Optimized Layout Design: A professional and intuitive layout has been implemented to facilitate seamless user navigation throughout the quiz experience.

Technical Specifications and Exception Handling
API Communication Fallback Mechanism: In the event that the live API becomes unresponsive or exceeds an eight-second timeout threshold, the application is designed to transition seamlessly to a locally stored set of sample questions.

Selectable Data Source: A toggle control on the initial screen grants users the ability to manually alternate between the live API and the local data source.

Persistence of High Scores: The highest achieved score is preserved in the browser's localStorage, enabling users to benchmark their performance against previous sessions.

Session State Persistence: Should a page refresh occur during an active quiz, the application's current state—including the active question, score, and submitted answers—is restored via sessionStorage to prevent any loss of progress.

Asynchronous Operation States: The application displays a designated loading indicator during data-fetching operations and presents clear error notifications in the event of a technical issue.

Accessibility Standards: The application incorporates ARIA labels and live regions to enhance compatibility with screen reader technologies and improve the overall user experience for individuals with disabilities.

🛠️ Technology Stack
Framework: React

Routing: React Router

Styling: Tailwind CSS

Animations: Framer Motion

Icons: Lucide React

Build Tool: Vite

🚀 Implementation and Deployment Guide
To establish a local development environment and execute the project, please adhere to the following procedures.

Prerequisites
The following software is required to be installed on the local machine:

Node.js

npm (Node Package Manager)

Installation Procedure
Clone the Source Repository:

git clone https://github.com/deepgupta6/today-pay-assignment.git
cd react-trivia-quiz

Install Project Dependencies:

npm install

Initiate the Development Server:

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
