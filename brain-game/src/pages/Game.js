import React, { useState, useEffect, useRef } from "react";

function Game() {
  const [letter, setLetter] = useState("");
  const [word, setWord] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timer, setTimer] = useState(10);
  const timerRef = useRef(null);

  // Generate a random letter
  const generateRandomLetter = () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    setLetter(alphabet[Math.floor(Math.random() * alphabet.length)]);
    setWord(""); // Reset word
    setFeedback(""); // Reset feedback
    setTimer(10); // Reset timer to 10 seconds
    clearInterval(timerRef.current); // Clear any existing timer
    startTimer();
  };

  const startTimer = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            timerRef.current = null;
            setFeedback("Time's up!");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const handleSubmit = async () => {
    // Stop the timer
    clearInterval(timerRef.current);
    timerRef.current = null;
    // Validate if the word starts with the random letter
    if (!word.toLowerCase().startsWith(letter)) {
      setFeedback(`"${word}" does not start with the letter "${letter}"!`);
      return;
    }

    // Proceed to check if the word is valid via the dictionary API
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );

      if (response.ok) {
        const result = await response.json();
        setFeedback(`"${word}" is a valid word!`);
        console.log(result); // For debugging
      } else if (response.status === 404) {
        setFeedback(`"${word}" is not a valid word!`);
      } else {
        setFeedback("An unexpected error occurred while checking the word.");
      }
    } catch (error) {
      // Catch any network-related errors
      setFeedback("Please check your connection and try again.");
      console.error("Network error:", error);
    }
  };

  // Generate random letter on component mount
  useEffect(() => {
    generateRandomLetter();
  }, []);

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    console.log(`New letter generated: ${letter}`);
  }, [letter]);

  return (
    <div className="Game">
      {letter && (
        <div>
          <button onClick={generateRandomLetter}>
            Click to genrate random letter
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
            maxLength="9"
            placeholder={`Enter a word starting with ${letter}`}
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <button onClick={handleSubmit}>Submit Word</button>
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
}

export default Game;
