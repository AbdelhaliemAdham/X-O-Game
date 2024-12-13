import React from "react";

export default function GameOver({ winner, reMatch }) {
  return (
    <div id="game-over">
      <h1>Game Over!</h1>
      {!winner ? <p>Game is Draw</p> : <p> {winner} wins!</p>}
      <p>
        <button onClick={reMatch}>Re-Match!</button>
      </p>
    </div>
  );
}
