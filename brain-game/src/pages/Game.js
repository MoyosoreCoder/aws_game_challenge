import React, { useState, useEffect } from "react";

const WordGame = () => {
  const [currentWord, setCurrentWord] = useState(null);
  const [userGuess, setUserGuess] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // 30-second timer
  const [gameStatus, setGameStatus] = useState("playing");

  // Word list with their antonyms
  const wordList = [
    { word: "happy", antonym: "sad" },
    { word: "brave", antonym: "cowardly" },
    { word: "calm", antonym: "anxious" },
    { word: "wise", antonym: "foolish" },
    { word: "kind", antonym: "mean" },
    { word: "swift", antonym: "slow" },
    { word: "bright", antonym: "dim" },
    { word: "strong", antonym: "weak" },
    { word: "gentle", antonym: "rough" },
    { word: "pure", antonym: "impure" },
    { word: "dance", antonym: "stand" },
    { word: "sing", antonym: "silence" },
    { word: "jump", antonym: "sit" },
    { word: "run", antonym: "walk" },
    { word: "smile", antonym: "frown" },
    { word: "friend", antonym: "enemy" },
  ];

  // Function to get a random word
  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    setCurrentWord(wordList[randomIndex]);
  };

  // Start the game with a random word
  useEffect(() => {
    getRandomWord();
  }, []);

  useEffect(() => {
    getRandomWord();
  }, []);

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0 && gameStatus === "playing") {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer); // Clean up the timer
    } else if (timeLeft === 0) {
      setGameStatus("finished");
    }
  }, [timeLeft, gameStatus]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the user's guess matches the antonym
    if (userGuess.toLowerCase() === currentWord.antonym) {
      setScore(score + 1);
      alert("Correct! 🎉");
    } else {
      alert(`Sorry, the correct antonym is: ${currentWord.antonym}`);
      console.log(`Sorry, the correct antonym is: ${currentWord.antonym}`);
    }

    setUserGuess("");
    getRandomWord(); // Get the next random word
  };

  return (
    <div className="word-game">
      <h2>Antonym Guessing Game</h2>
      <div className="score">
        <strong>Score:</strong> {score}
      </div>
      <div className="timer">
        <strong>Time Left:</strong> {timeLeft}s
      </div>

      {gameStatus === "playing" && currentWord && (
        <div className="game-container">
          <div className="word-info">
            <p>
              <strong>Word:</strong> {currentWord.word}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              placeholder="Enter the antonym"
            />
            <button type="submit">Submit Guess</button>
          </form>
        </div>
      )}

      {gameStatus === "finished" && (
        <div className="game-over">
          <h3>Game Over!</h3>
          <p>Final Score: {score}</p>
          <button onClick={() => window.location.reload()}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default WordGame;
