import React, { useState} from "react";
import './difficulty.css';



const Difficulty = ({ playerName, setDifficulty }) => {
    

    const [selectedDifficulty, setSelectedDifficulty] = useState(null);

    return (
        <>
            <div className="container">
                <div className="game-area max-w-xl">
                    <header className="title">
                        <p>Hello {playerName} !</p>
                    </header>
                    <div>
                    <p>The aim of the game is to select the missing letter from the common exception word.</p>
                    <p>Get 10 correct to win!</p>
                    <br />
                    <p>Now select the your Difficulty and get ready to play!</p>
                    <h2>Difficulty</h2>
                    <ul className="difficulty-select">
                        {[1,2,3].map((difficulty) => (
                            <li
                                key={difficulty}
                                className={`${selectedDifficulty === difficulty ? "is-selected" : ""}`}
                                onClick={() => setSelectedDifficulty(difficulty)}
                            >{difficulty}</li>
                        ))}
                    </ul>
                    </div>
                    <button
                        className="accept-btn"
                        onClick={() => setDifficulty(selectedDifficulty)}
                        >Start</button>
                </div>
            </div>
        </>
    )
};

export default Difficulty;