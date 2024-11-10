import { useState, useEffect } from "react";
import './message.css';

const Message = ({ result, originalWord }) => {
    const [showMessage, setShowMessage] = useState(false);
    console.log("Pram from result is:", result)
    console.log("showMessage pram is:", showMessage)

    // Set a timer to hide the message after 3 seconds
    useEffect(() => {
        if (result !== null) {
            setShowMessage(true);

            const timer = setTimeout(() => {
                setShowMessage(false);
            }, 2000);
            
            return () => clearTimeout(timer);
        }

    }, [result]);

    // Only render the message if showMessage is true
    if (!showMessage) return null;

    return (
        <>
            <div className='message-box'>
                {result === "correct" ? (
                    <>
                        <p>Correct!</p>
                        <p>The word was:</p>
                        <p className="correct-word"><u>{originalWord}</u></p>
                        <p>Great Job!</p>
                    </>
                ) : (
                    <>
                        <p>Oops!</p>
                        <p>The word was:</p>
                        <p className="correct-word"><u>{originalWord}</u></p>
                        <p>Try again!</p>
                    </>
                )}
            </div>
        </>
    )
};

export default Message;