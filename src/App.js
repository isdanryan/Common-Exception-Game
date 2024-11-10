import { useState, useEffect } from "react";
import word_lists from './words.json';
import ScoreBoard from './components/scoreboard/score';
import Message from "./components/message/message";

// Function to generate a random word
function getRandomWord(word_lists) {
  const words = word_lists.year_1;
  const randomIndex = Math.floor(Math.random() * words.length); // Get a random number from within the words list
  const selectedWord = words[randomIndex];
  const randomPlacement = Math.floor(Math.random() * selectedWord.length); // Get a random number within the word length
  const wordAndLetter = replaceChar(selectedWord, randomPlacement);
  return wordAndLetter; // Return the word at the position of the random number
}

// Function to replace a random letter in the selected word with a _ character
function replaceChar(str, index) {
  const blankedWord =  str.substring(0, index) + "_" + str.substring(index + 1);
  const missingLetter = str.charAt(index);
  const generatedWord = [blankedWord, missingLetter];
  return generatedWord;
}

// Function to generate a list of random letters, plus the correct letter
function generateAnswers(letter) {
  const getLetter = letter;
  const alphabet = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
    "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
  ];

  let answerLetter1, answerLetter2;

  do {
    // Generate two random letters
    answerLetter1 = alphabet[Math.floor(Math.random() * 26)];
    answerLetter2 = alphabet[Math.floor(Math.random() * 26)];
  } while (
    answerLetter1 === getLetter ||  // Ensure answerLetter1 is not the same as getLetter
    answerLetter2 === getLetter ||  // Ensure answerLetter2 is not the same as getLetter
    answerLetter1 === answerLetter2 // Ensure answerLetter1 and answerLetter2 are different
  );

  let answerArray = [answerLetter1, answerLetter2];

  const randomIndex = Math.floor(Math.random() * (answerArray.length + 1));
  // Insert the item at the random index
  answerArray.splice(randomIndex, 0, getLetter);

  
  return answerArray;
}

function App() {

  const [word, setWord] = useState("");
  const [score, setScore] = useState(0);
  const [result, setResult] = useState("");

  // Get the random word when the component loads
  useEffect(() => {
    setWord(getRandomWord(word_lists));
  }, []);

  const generatedWord = word[0];
  const letter = word[1];

  const answers = generateAnswers(letter);

  // Function to check the answer and update the score
  function checkGuess(answer) {
    if (answer === letter) {
      // Update the score and get a new word
      setResult("correct");
      setScore(prevScore => prevScore + 1);
      setWord(getRandomWord(word_lists));
    } else {
      setResult("incorrect");
      setWord(getRandomWord(word_lists));
    }
  }

    // Reset `result` after it has been displayed by Message
    useEffect(() => {
      if (result !== null) {
        const resetResult = setTimeout(() => setResult(null), 3000);
        return () => clearTimeout(resetResult);
      }
    }, [result]);

  return (  
    <>
      <Message result={result} />
      <div className='game-area max-w-xl'>
        <header>
          <h1 className='title'>Common Exception Word Game</h1>
          <p>Can you guess the missing letter?</p>
        </header>

        <div className='display-area'>
          {generatedWord}
        </div>

        <div className='letter-area'>
          {answers.map((answer, index) => (
            <li
              key={index}
              value={answer}
              onClick={() => (checkGuess(answer))}
            >{answer}</li>
          ))}
        </div>
        <ScoreBoard
          player={"Maisie"}
          score={score} />
      </div>
    </>

  );
}

export default App;
