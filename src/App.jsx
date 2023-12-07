import { useState } from "react";
import GameBoard from "./components/GameBoard.jsx";
import GameOver from "./components/GameOver.jsx";
import Log from "./components/Log.jsx";
import PlayerInfo from "./components/PlayerInfo.jsx";
import { WINNING_COMBINATIONS } from "./components/winning_combinations.js";


// Defining the initial players for the game
const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
}

// Defining the initial state of the game board, a 3x3 grid filled with null values
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

/**
 * Derives the active player based on the game turns.
 * @param {Array} gameTurns - The array of game turns.
 * @returns {string} - The active player ("X" or "O").
 */
function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

/**
 * Derives the game board based on the given game turns.
 * @param {Array} gameTurns - The array of game turns.
 * @returns {Array} - The derived game board.
 */
function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array=>[...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

/**
 * Determines the winner of the tic-tac-toe game based on the current game board.
 * @param {Array<Array<string|null>>} gameBoard - The current game board represented as a 2D array.
 * @param {Object} players - An object containing the players' symbols as keys and their names as values.
 * @returns {string|undefined} - The name of the winning player or undefined if there is no winner yet.
 */
function deriveWinner(gameBoard, players) {
  // function implementation
}
function deriveWinner(gameBoard, players) {
  let winner;
  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combinations[0].row][combinations[0].column];
    const secondSquareSymbol = gameBoard[combinations[1].row][combinations[1].column];
    const thirdSquareSymbol = gameBoard[combinations[2].row][combinations[2].column];

    if (firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS) // the players are stored in the state
  const [gameTurns, setGameTurns] = useState([]); // the game turns are stored in the state
  const activePlayer = deriveActivePlayer(gameTurns); // the active player is derived from the game turns
  const gameBoard = deriveGameBoard(gameTurns);   // the game board is derived from the game turns
  const hasDraw = gameTurns.length === 9 && !winner; // if there are 9 turns and no winner, it's a draw
  const winner = deriveWinner(gameBoard,players); // if there is a winner, it will be the name of the winner, otherwise undefined

  function handleRestart() {
    setGameTurns([]);
  }

  /**
   * Updates the player name for the specified player symbol.
   * @param {string} playerSymbol - The symbol of the player ('X' or 'O').
   * @param {string} playerName - The new name for the player.
   */
  function handlePlayerNameChange(playerSymbol, playerName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [playerSymbol]: playerName,
      };
    });
  }
  
  /**
   * Handles the switch of players in the game.
   * 
   * @param {number} rowIndex - The row index of the selected square.
   * @param {number} colIndex - The column index of the selected square.
   */
  function handleSwitchPlayer(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <PlayerInfo
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <PlayerInfo
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && <GameOver onRestart={handleRestart} winner={winner}></GameOver>}
        <GameBoard handleSelectSquare={handleSwitchPlayer} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
