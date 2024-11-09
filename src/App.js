import { useState, useEffect } from "react";
import word_lists from './words.json';

function replaceChar(str, index) {
  const blankedWord =  str.substring(0, index) + "_" + str.substring(index + 1);
  const missingLetter = str.charAt(index);
  console.log("Letter missing is:", missingLetter);
  const generatedWord = [blankedWord, missingLetter];
  return generatedWord;
}

function getRandomWord(word_lists) {
  const words = word_lists.year_2;
  const randomIndex = Math.floor(Math.random() * words.length); // Get a random number from within the words list
  const selectedWord = words[randomIndex];
  console.log("Word is:", selectedWord);
  const randomPlacement = Math.floor(Math.random() * selectedWord.length); // Get a random number within the word length
  console.log("Position to blank is:", randomPlacement);
  const wordArray = replaceChar(selectedWord, randomPlacement);
  const word = wordArray[0];
  const letter = wordArray[1];
  console.log("Finale word is:", word);
  console.log("Missing letter is:", letter);
  return word; // Return the word at the position of the random number
}


function App() {
  const [word, setWord] = useState("");

  // Get the random word when the component loads
  useEffect(() => {
    setWord(getRandomWord(word_lists));
  }, []);

  return (  
    <div className='game-area max-w-xl'>
      <header>
        <h1 className='title'>Common Exception Word Game</h1>
        <p>Can you guess the missing letter?</p>
      </header>

      <div className='display-area'>
        {word}
      </div>

      <div className='letter-area'>
        <li>A</li>
        <li>B</li>
        <li>C</li>
      </div>
    </div>
  );
}

export default App;
