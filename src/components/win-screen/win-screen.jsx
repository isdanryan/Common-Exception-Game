import React from "react";
import './win-screen.css';

const WinScreen = ({ resetGame }) => {

    return (
        <>
            <div className="game-area max-w-xl">
            <header className="title">
                <h1>Congratulations!</h1>
                <p>You got 10 correct!</p>
            </header>
            <button
                className="accept-btn"
                onClick={resetGame}>Play again</button>
            <button
                className="cancel-btn"
            >Menu</button>
            </div>

        </>
    )
}

export default WinScreen;