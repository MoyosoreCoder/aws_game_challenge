import React, { useState, useEffect } from "react";
import "./App.css";

function Game() {
  const [letters, setLetters] = useState([]);
  const [selectedWord, setSelectedWord] = useState("");
  const [score, setScore] = useState(0);
  // 60-seconds
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    const generateRandomLetters = () => {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const randomLetters = Array.from(
        { length: 9 },
        () => alphabet[Math.floor(Math.random() * alphabet.length)]
      );
      //console.log(randomLetters);
      setLetters(randomLetters);
    };
    generateRandomLetters();
  }, []);

  useEffect(() => {
    console.log("Updated letters state:", letters); // Logs updated letters
  }, [letters]);

  const startGame = () => {
    console.log("button clicked");
    //form words withe the random letters
  };

  return (
    <div className="App">
      <h1>Word puzzle game</h1>
      <button onClick={startGame}>Enjoy the game</button>
    </div>
  );
}

export default Game;
