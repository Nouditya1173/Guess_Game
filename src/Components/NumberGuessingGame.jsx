import React, { useState } from 'react';

const NumberGuessingGame = () => {
    const [random, setRandom] = useState(Math.round(Math.random() * 100 + 1));
    const [userInput, setUserInput] = useState('');
    const [prevGuesses, setPrevGuesses] = useState([]);
    const [numGuess, setNumGuess] = useState(1);
    const [playGame, setPlayGame] = useState(true);
    const [message, setMessage] = useState('');
    //const [userInput, setUserInput] = useState('');

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const guess = parseInt(userInput);
        validateGuess(guess);
        setUserInput("");
    };

    const validateGuess = (guess) => {
        if (isNaN(guess)) {
            alert(`Please guess a number`);
        } else if (guess < 1) {
            alert(`Please guess greater than 1`);
        } else if (guess > 100) {
            alert(`Please guess less than 100`);
        } else {
            const updatedGuesses = [...prevGuesses, guess];
            setPrevGuesses(updatedGuesses);
            if (numGuess === 10) {
                displayMessage(`Game Over. Random Number was ${random}`);
                endGame();
            } else {
                checkGuess(guess);
            }
        }
    };

    const checkGuess = (guess) => {
        if (guess === random) {
            displayMessage(`Congratulations! You guessed the right number.`);
            endGame();
        } else if (guess < random) {
            displayMessage(`Number is too low`);
        } else if (guess > random) {
            displayMessage(`Number is too high`);
        }
        setNumGuess(numGuess + 1);
    };

    const displayMessage = (message) => {
        setMessage(message);
    };

    const endGame = () => {
        setPlayGame(false);
    };

    const newGame = () => {
        setRandom(Math.round(Math.random() * 100 + 1));
        setPrevGuesses([]);
        setNumGuess(1);
        setMessage('');
        setPlayGame(true);
    };

    return (
        <div className="flex justify-center bg-indigo-200 items-center max-w-full h-screen">
            <div className="text-center">
                <h1 className="text-4xl font-extrabold mb-4">Number Guessing Game</h1>
                <p className="mb-4">Try and guess the random number between 1 to 100</p>
                <p className="mb-4">You have 10 attempts to guess the right number.</p>
                <div className="mt-8 border-gray-950">
                    <form onSubmit={handleSubmit} className="mb-4">
                        <div className="mb-4">
                            <h2 className="font-bold">Guess a Number</h2>
                        </div>
                        <input type="text" value={userInput} onChange={handleInputChange} className=" border  border-gray-400 px-4 py-1 rounded-md focus:outline-none focus:border-blue-500 " /><br/><br/>
                        <button type="submit" className=" mt-3 px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer">Submit Guess</button>
                    </form>
                    <div className="text-left">
                        <p>Previous guesses: <span className="text-black-500">{prevGuesses.join(', ')}</span></p>
                        <p>Guesses Remaining: <span className="font-bold">{11 - numGuess}</span></p>
                        <p className="text-black-500 text-lg font-extrabold">{message}</p>
                    </div>
                    {!playGame && <button onClick={newGame} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer">Start New Game</button>}
                </div>
            </div>
        </div>
    );
};

export default NumberGuessingGame;
