import React, { useState } from "react";





// ------------------------CHILD---------------------------------
function Square({ value, onSquareClick }) {

  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// -------------------------WINNER--------------------------------
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // horizontal
    [3, 4, 5], // horizontal
    [6, 7, 8], // horizontal
    [0, 3, 6], // vertical
    [1, 4, 7], // vertical
    [2, 5, 9], // vertical
    [0, 4, 8], // diagonal
    [2, 4, 6]  // diagonal
  ];
  for (let i=0; i<lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] ) {
      return squares[a];
    }
  }
  return null;
}



// -------------------------PARENT--------------------------------
function Board( { xIsNext, squares, onPlay} ) {

  const winner = calculateWinner(squares);
  const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? "X" : "O"}`;



  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
      if (xIsNext) {
        nextSquares[i] = "X";
      } else {
        nextSquares[i] = "O";
      }
    onPlay(nextSquares);
  }
  

// -------------------------JSX--------------------------------
  return (
    <>

      <div className="status">{status}</div>

      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>


    </>
)};



// -------------------------GAME--------------------------------
export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentStep, setCurrentStep] = useState(0);
  const currentSquares = history[currentStep]; // last item in the array


  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentStep + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentStep(nextHistory.length - 1); // last item in the array
    setXIsNext(!xIsNext);
  }

  function jumpTo(step) {
    setCurrentStep(step);
    setXIsNext(step % 2 === 0); // if step is even, xIsNext is true
  }

  const moves = history.map((step, move) => {
    let description;
    if (move+1 == history.length) {
      description = 'You are here!';
    } else if (move > 0) {
      description = `Go to move #${move}`;
    } else {
      description = `Begin the game!`;
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>
          {moves}
        </ol>
      </div>
    </div>
  );
}
