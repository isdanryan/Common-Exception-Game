import { useState, useEffect } from "react";
import word_lists from './words.json';


function App() {
  const [word, setWord] = useState("");

  // Function to get a random word
  const getRandomWord = () => {
    const words = word_lists.year_2;
    const randomIndex = Math.floor(Math.random() * words.length) // Get a random number from within the words list
    return words[randomIndex]; // Return the word at the position of the random number
  };

  // Get the random word when the component loads
  useEffect(() => {
    setWord(getRandomWord());
  }, []);

  return (  
    <div className='game-area max-w-xl'>
      <header>
        <h1 className='title'>Common Exception Word Game</h1>
        <p>Can you guess the word?</p>
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
