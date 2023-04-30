import React, { useState, Dispatch } from 'react';
import './App.css';


// Build a tic tac toe game 
// What is tic tac toe
/**
 * build tic tac toe
 * What is tic tac toe
 * It's a game played on 3 by 3 board
 * There are two players
 * The objective is to get 3 in a row of either x or o 
 *  either vertically, horizontally, or diagonally 
 * Each player takes turns making a move - and x goes first always
 */

/**
 * In building this, we need to think about a few things
 * First the data models
 * - track whose turn it is (use State)
 * - model the board - (Use State)
 * - have some type of win states
 * 
 * And the actual functionality
 * - click a box to mark your spot
 * - Want to be able to switch players after someone goes
 * - Want to be able to tell if someone has won yet or if it's a draw
 */


/**
 * 
 * Let's do this iteratively 
 * First let's model the board
 * then allow a player to mark a board position
 *  - who's turn it is 
 *  - a click should mark adding of a character
 *  - if a character is already marked, don't do anything
 *  -   don't rewrite the x or o and don't switch players
 * Then enable a switching of players
 * Then enable a check win scoring algo
 * then enable a check if it's a draw
 */

type gameValues = 'X'| 'null' | 'O'
type Board =  gameValues[]
type BoardSlotProps = {
  idx: number;
  player: gameValues;
  setPlayer: Dispatch<gameValues>;
  setBoard: Dispatch<Board>;
  board: Board;
}

const BoardSlot = ({idx, player, setPlayer, board,  setBoard}: BoardSlotProps) => {
  const value = board[idx]
  const markBoard = () => {
    if (value === "X" || value === "O") {
      return
    }
    // mark the board
    const newboard = [...board];
    newboard[idx] = player;
    setBoard(newboard)

    const newplayer = player === "X"? 'O': 'X'
    setPlayer(newplayer)
  }

  return (
    <div className='boardSlot' onClick={() => markBoard()}>{value}</div> 
  )
}

function App() {
  /**
   * Modeling the board. 
   * state - an array
   * the ui - 3by 3 grid of divs
   */
  const emptyBoard = new Array(9).fill('null')
  const [board, setBoard] = useState(emptyBoard);
  const [player, setPlayer] = useState<gameValues>('X');

  // Figuring out who won
  const findWinner = () => {
    // returns False or the value of the winner in an object

    // note all the winning combinations
    const WinningCombs = [ //rows, columns, diagonals
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ]
    // Check the board to know if any of these winning combos exist
    // go through each winning combination and then will check if those windingcomb indexes all have the same value
    // and the value isn't null

    const ActualWinComb = WinningCombs.find(([idx1, idx2, idx3]) => {
      if (board[idx1] === board[idx2] && board[idx2] === board[idx3] && board[idx3] !== 'null') {
        return true;
      }
      return false;
    })
    
    return ActualWinComb? {value: board[ActualWinComb[0]]}: {value: false};
  }

  const hasWinner = findWinner()

  return (
    <>
    <div className="boardContainer">
      {board.map((_value, idx)=> {
        return <BoardSlot idx={idx} player={player} setPlayer={setPlayer} setBoard={setBoard} board={board}/>
      })}
    </div>
    {hasWinner['value'] && <div>
      {`Player ${hasWinner['value']} is the winner`}
    </div> }
    </>
  );
}

export default App;
