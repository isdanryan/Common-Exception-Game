import React from "react";

const WinScreen = ({ resetGame }) => {

    return (
        <>
            <div className="game-area max-w-xl">
            <header className="title">
                <h1>Congratulations!</h1>
                <h2>You got 10 correct!</h2>
            </header>
            <button
                onClick={resetGame}>Play again</button>
            </div>
        </>
    )
}

export default WinScreen;