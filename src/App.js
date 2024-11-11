import { useState, useEffect } from "react";
import word_lists from './words.json';
import ScoreBoard from './components/scoreboard/score';
import Message from "./components/message/message";
import WinScreen from "./components/win-screen/win-screen";
import StartScreen from "./components/start-screen/start-screen";

// Function to generate a random word
function getRandomWord(word_lists) {
  const words = word_lists.year_1;
  const randomIndex = Math.floor(Math.random() * words.length);
  const selectedWord = words[randomIndex];
  const randomPlacement = Math.floor(Math.random() * selectedWord.length);
  const blankedWord = replaceChar(selectedWord, randomPlacement);
  return { blankedWord, originalWord: selectedWord, missingLetter: selectedWord[randomPlacement] };
}

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

  const [word, setWord] = useState({ blankedWord: "", originalWord: "", missingLetter: "" });
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(null);
  const [lastWord, setLastWord] = useState("");
  const [newGame, setNewGame] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [disabled, setDisabled] = useState(false);

  const loadNewWord = () => {
    const newWord = getRandomWord(word_lists);
    setWord(newWord);
    setAnswers(generateAnswers(newWord.missingLetter));
  }

  const resetGame = () => {
    setScore(0);
    setResult(null);
    loadNewWord();
  }

  // Initial load of word when the component mounts
  useEffect(() => {
    loadNewWord();
  }, []);

  // Function to check the answer and update the score
  function checkGuess(answer) {
    if (answer === word.missingLetter) {
      setScore(prevScore => prevScore + 1);
      setResult("correct");
    } else {
      setResult("incorrect");
    }
    setLastWord(word.originalWord);
  }


  // Reset `result` after it has been displayed by Message
  useEffect(() => {
    if (result !== null) {
      setDisabled(true);
      const resetResult = setTimeout(() => setResult(null), 2000);
      return () => clearTimeout(resetResult);
    }
    loadNewWord();
    setDisabled(false);
  }, [result]);
 

  if (newGame === false) {
    return <StartScreen setNewGame={setNewGame} setPlayerName={setPlayerName} setScore={setScore}/>
  }

  // Shown winning screen if score gets to 10
  if (score >= 10) {
    return (
      <>
        <Message result={result} originalWord={lastWord} />     
        <WinScreen resetGame={resetGame} setNewGame={setNewGame}/>
      </>
    )
  }
  return (  
    <>
      <div className={`container ${disabled ? "disabled" : ""}`}>
      <Message result={result} originalWord={lastWord} />
      <div className='game-area max-w-xl'>
        <header>
          <h1 className='title'>Common Exception Word Game</h1>
          <p>Can you guess the missing letter?</p>
        </header>

        <div className='display-area'>
          {`${result ? word.originalWord : word.blankedWord}`}
        </div>

        <div className='letter-area'>
          {answers.map((answer, index) => (
            <li
              key={index}
              value={answer}
              onClick={disabled ? null : () => checkGuess(answer)}
            >{answer}</li>
          ))}
        </div>
        <ScoreBoard
          player={playerName}
          score={score} />
      </div>
      </div>
    </>
  );
}

export default App;
