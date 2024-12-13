import React from "react";

function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          {turn.player} selected {turn.square.row} , {turn.square.col}
        </li>
      ))}
      <li>{turns.length === 9 ? "Game Over" : ""}</li>
    </ol>
  );
}

export default Log;
