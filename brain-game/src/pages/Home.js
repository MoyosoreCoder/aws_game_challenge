import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate("/game");
  };

  return (
    <div className="Home">
      <h1>Welcome to the Home Page</h1>
      <button onClick={handleStartGame}>Start Game</button>
    </div>
  );
}

export default Home;
