
function App() {
  return (
    <div className='game-area max-w-xl'>
      <header>
        <h1 className='title'>Common Exception Word Game</h1>
        <p>Can you guess the word?</p>
      </header>

      <div className='display-area'>
        <p>WORD GOES HERE</p>
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
