import React, { useState, useEffect } from "react";

function DictionaryGame() {
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
    //valid api
    const response = await fetch("", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(word, letter),
    });
    const result = await response.json();
    console.log(result);
  };

  // Countdown timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setFeedback("Time's up!");
    }
  }, [timer]);

  return (
    <div>
      <h1>Dictionary Game</h1>
      <button onClick={generateRandomLetter}>Start Game</button>
      {letter && (
        <div>
          <p>
            Random Letter: <strong>{letter}</strong>
          </p>
          <p>
            Time Remaining: <strong>{timer}</strong> seconds
          </p>
          <input
            type=" text"
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

export default DictionaryGame;
