import Player from "./components/player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import { useState } from "react";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning_compinations.js";
import GameOver from "./components/GameOver.jsx";
const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

let winner = null;

function getCurrentPlayer(params) {
  let currentPlayer = "X";

  if (params.length > 0 && params[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}
function winnerDetector({ newGameBoard, players, winner }) {
  for (const compination of WINNING_COMBINATIONS) {
    const firstSymbol = newGameBoard[compination[0].row][compination[0].column];
    const secondSymbol =
      newGameBoard[compination[1].row][compination[1].column];
    const thirdSymbol = newGameBoard[compination[2].row][compination[2].column];
    if (
      firstSymbol !== null &&
      firstSymbol === secondSymbol &&
      secondSymbol === thirdSymbol
    ) {
      winner = players[firstSymbol];
    }
  }
  return winner;
}
function App() {
  const [players, setPlayerName] = useState({
    X: "player X",
    O: "player O",
  });
  const [gameTurn, setGameTurns] = useState([]);

  let newGameBoard = [...initialBoard.map((items) => [...items])];
  for (const turn of gameTurn) {
    const { square, player } = turn;
    const { row, col } = square;
    newGameBoard[row][col] = player;
  }

  let currentPlayer = getCurrentPlayer({ gameTurn });

  //this function handle active player and player turn
  function handleActivePlayer(rowIndex, colIndex) {
    setGameTurns((prevTurn) => {
      currentPlayer = getCurrentPlayer(prevTurn);
      const updatedList = [
        {
          square: { row: rowIndex, col: colIndex },
          player: currentPlayer,
        },
        ...prevTurn,
      ];
      return updatedList;
    });
  }

  winner = winnerDetector({ players, newGameBoard, winner: null });

  let draw = !winner && gameTurn.length === 9;

  function handlePlayerName(symbol, newName) {
    setPlayerName((prevPlayer) => {
      return { ...prevPlayer, [symbol]: newName };
    });
  }

  function resetMatch() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name="Player 1"
            symbol="X"
            isActive={currentPlayer === "X"}
            onChangePlayer={handlePlayerName}
          />
          <Player
            name="Player 2"
            symbol="O"
            isActive={currentPlayer === "O"}
            onChangePlayer={handlePlayerName}
          />
        </ol>
        {(winner || draw) && <GameOver reMatch={resetMatch} winner={winner} />}
        <GameBoard onSelectSquare={handleActivePlayer} board={newGameBoard} />
        <Log turns={gameTurn} />
      </div>
    </main>
  );
}

export default App;
