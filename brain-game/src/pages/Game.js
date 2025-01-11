import React, { useState, useEffect } from "react";

function Game() {
  const [letter, setLetter] = useState("");
  const [word, setWord] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timer, setTimer] = useState(10);

  // Generate a random letter
  const generateRandomLetter = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    setLetter(alphabet[Math.floor(Math.random() * alphabet.length)]);
    setTimer(10); // Reset timer
    setFeedback(""); // Reset feedback
  };

  // Handle word submission
  const handleSubmit = async () => {
    // Use a valid API
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.ok) {
      const result = await response.json();
      setFeedback(`"${word}" is a valid word!`);
      console.log(result);
    } else {
      setFeedback(`"${word}" is not a valid word!`);
    }
  };

  // Generate random letter on component mount
  useEffect(() => {
    generateRandomLetter();
  }, []);

  // Countdown timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setFeedback("Time's up!");
    }
  }, [timer]);

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
          <p>Form a word with the random letter</p>
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
