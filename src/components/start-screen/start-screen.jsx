import React, { useState } from "react";
import './start-screen.css'

function capitaliseName(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1) + "?";
}

const StartScreen = ({ setNewGameFlag, setPlayerName, setScore }) => {

    const [inputName, setInputName] = useState("");

    const startGame = () => {
        setNewGameFlag(false);
        setScore(0);
        setPlayerName(capitaliseName(inputName).slice(0, -1));
    }

    return (
        <>
            <div className="container">
                <div className="game-area max-w-xl">
                    <header className="title">
                        <h1>Hi!</h1>
                        <p>What's your name?</p>
                    </header>
                    <input
                        className="name-input"
                        placeholder="Enter your name"
                        type="text"
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                    ></input>
                    <div className="player-name">
                        <h2>{capitaliseName(inputName)}</h2>
                    </div>
                    <button
                        className={`accept-btn ${inputName === "" ? "hidden" : ""}`}
                        onClick={() => startGame()}
                        >Yes</button>
                </div>
            </div>
        </>
    )
}

export default StartScreen