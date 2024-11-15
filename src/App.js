import { useState, useEffect, useCallback } from "react";
import word_lists from './words.json';
import ScoreBoard from './components/scoreboard/score';
import Message from "./components/message/message";
import WinScreen from "./components/win-screen/win-screen";
import StartScreen from "./components/start-screen/start-screen";
import Difficulty from "./components/difficulty/difficulty";



// Function to replace a random letter in the selected word with a _ character
function replaceChar(str, index) {
  return str.substring(0, index) + "_" + str.substring(index + 1);
}

// Function to generate a list of random letters, plus the correct letter
function generateAnswers(letter) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  let randomLetters = alphabet
    .filter(l => l !== letter)
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);

  const answerOptions = [letter, ...randomLetters].sort(() => Math.random() - 0.5);
  return answerOptions;
}

function App() {
  const [word, setWord] = useState("");
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(null);
  const [lastWord, setLastWord] = useState("");
  const [newGameFlag, setNewGameFlag] = useState(true);
  const [playerName, setPlayerName] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  const [isGameover, setIsGameover] = useState(false);

  // Function to generate a random word
  function getRandomWord(word_lists, difficulty) {
    if (!difficulty) {
      console.error("No difficulty set yet.");
      return { blankedWord: "", originalWord: "", missingLetter: "" };
    }
    const difficultyKey = difficulty.toString();
    const words = word_lists[difficultyKey];
    const randomIndex = Math.floor(Math.random() * words.length);
    const selectedWord = words[randomIndex];
    const randomPlacement = Math.floor(Math.random() * selectedWord.length);
    const blankedWord = replaceChar(selectedWord, randomPlacement);
    return { blankedWord, originalWord: selectedWord, missingLetter: selectedWord[randomPlacement] };
  }

  const loadNewWord = useCallback(() => {
    if (isGameover) return;
    const newWord = getRandomWord(word_lists, difficulty);
    setWord(newWord);
    setAnswers(generateAnswers(newWord.missingLetter));
  }, [difficulty, isGameover]);

  const resetGame = () => {
    setScore(0);
    setResult(null);
    setDifficulty(null);
    setIsGameover(false);
    setLastWord("");
    setAnswers([]);
    setDisabled(false);
    setWord("");
  };

  const newGame = () => {
    setScore(0);
    setResult(null);
    setDifficulty(null);
    setNewGameFlag(true);
    setIsGameover(false);
  };

  function checkGuess(answer) {
    // Prevent further guesses if the game is over
    if (isGameover) {
      console.log("Game is over. Guess ignored.");
      return;
    } else {
      if (answer === word.missingLetter) {
        setScore((prevScore) => prevScore + 1);
        setResult("correct");
      } else {
        setResult("incorrect");
      }
      setLastWord(word.originalWord);
    }
  }

  // Reset `result` after it has been displayed by Message
  useEffect(() => {
    if (result !== null) {
      setDisabled(true);
      const resetResult = setTimeout(() => setResult(null), 2000);
      return () => clearTimeout(resetResult);
    }
    setDisabled(false);
    loadNewWord();
  }, [result, loadNewWord]);

  if (newGameFlag) {
    return (
      <StartScreen
        setNewGameFlag={setNewGameFlag}
        setPlayerName={setPlayerName}
        setScore={setScore}
      />
    );
  }

  if (!newGameFlag && difficulty === null) {
    return <Difficulty playerName={playerName} setDifficulty={setDifficulty} />;
  }

  if (difficulty !== null) {
    if (isGameover) {
      return (
        <>
          <WinScreen resetGame={resetGame} newGame={newGame} />
        </>
      );
    }
    return (
      <>
        <div className={`container ${disabled ? "disabled" : ""}`}>
          <Message result={result} originalWord={lastWord} score={score} setIsGameOver={setIsGameover} />
          <div className="game-area max-w-xl">
            <header>
              <h1 className="title">Common Exception Word Game</h1>
              <p>Can you guess the missing letter?</p>
            </header>

            <div className="display-area">
              {`${result ? word.originalWord : word.blankedWord}`}
            </div>

            <div className="letter-area">
              {answers.map((answer, index) => (
                <li
                  key={index}
                  value={answer}
                  onClick={disabled ? null : () => checkGuess(answer)}
                >
                  {answer}
                </li>
              ))}
            </div>
            <ScoreBoard player={playerName} score={score} />
          </div>
        </div>
      </>
    );
  }
}

export default App;

