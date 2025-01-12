import React, { useState, useEffect, useRef } from "react";

function Game() {
  const [letter, setLetter] = useState("");
  const [word, setWord] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timer, setTimer] = useState(10);
  const timerRef = useRef(null);
  const [score, setScore] = useState(0);

  // Generate a random letter
  const generateRandomLetter = () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    setLetter(randomLetter);
    setWord(""); // Reset word input
    setFeedback(""); // Reset feedback
    setTimer(10); // Reset timer to 10 seconds
    clearInterval(timerRef.current); // Clear existing timer
    startTimer(); // Start a new timer
  };

  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current); // Clear any existing interval
    }

    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current); // Stop timer when it reaches 0
          timerRef.current = null;
          setFeedback("Game over!");
          return 0;
        }
        return prev - 1;
      });
    }, 1000); // Decrement timer every second
  };

  const handleSubmit = async () => {
    // Stop the timer
    clearInterval(timerRef.current);
    timerRef.current = null;
    if (word.length !== 7) {
      setFeedback("Word must be exactly 9 letters long!");
      return;
    }

    // Validate if the word starts with the random letter
    if (!word.toLowerCase().startsWith(letter)) {
      setFeedback(`"${word}" does not start with the letter "${letter}"!`);
      return;
    }

    // Check if the word is valid using the dictionary API
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );

      if (response.ok) {
        setFeedback(`"${word}" is a valid word!`);
      } else if (response.status === 404) {
        setFeedback(`"${word}" is not a valid word!`);
      } else {
        setFeedback("An error occurred while checking the word.");
      }
    } catch (error) {
      setFeedback("Please check your internet connection and try again.");
    }
  };

  // Initialize a random letter when the component mounts
  useEffect(() => {
    generateRandomLetter();
  }, []);

  // Clean up the timer when the component unmounts
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="Game">
      <h2>Score: {score}</h2>
      <button onClick={generateRandomLetter}>
        Click to generate random letter
      </button>
      <p>
        The random letter is: <strong>{letter}</strong>
      </p>
      <p>Form a word with the random letter: {letter}</p>
      <p>
        Time Remaining: <strong>{timer}</strong> seconds
      </p>
      <input
        type="text"
        pattern=".{9}"
        required
        placeholder={`Enter a 9-letter word starting with ${letter}`}
        value={word}
        onChange={(e) => setWord(e.target.value)}
        title="Word must be exactly 9 characters long"
      />
      <button onClick={handleSubmit}>Submit Word</button>
      <p>{feedback}</p>
    </div>
  );
}

export default Game;
