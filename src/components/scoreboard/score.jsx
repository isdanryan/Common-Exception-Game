import './score.css';

const ScoreBoard = ({ player, score }) => {
    return (
        <>
            <div className="score-board">
                <p>{player}</p>
                <p>Your score is: {score}</p>
            </div>
        </>
    )
}

export default ScoreBoard;