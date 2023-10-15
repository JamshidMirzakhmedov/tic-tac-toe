import { useState } from "react";

function App() {
  const CROSS_CLASS = "cross";
  const CIRCLE_CLASS = "circle";

  const [cells, setCells] = useState(["", "", "", "", "", "", "", "", ""]);

  const [currentTurn, setCurrentTurn] = useState(true);

  const handleClick = (e) => {
    const cell = e.target;
    const currentClass = currentTurn ? CIRCLE_CLASS : CROSS_CLASS;

    makeMove(cell, currentClass);

    swapTurns();
  };

  const makeMove = (cell, currentClass) => {
    cell.firstChild.classList.add(currentClass);
    const { id } = cell;

    const newArrOfCells = cells.map((cell, index) => {
      const numId = parseInt(id, 10);
      if (index === numId) {
        return currentClass;
      } else {
        return cell;
      }
    });

    setCells(newArrOfCells);
  };

  const swapTurns = () => {
    setCurrentTurn(!currentTurn);
  };

  const winner = checkWin(cells);
  let message = winner
    ? `🎉  winner: ${winner === "cross" ? "X" : "O"} ! 🎉`
    : (currentTurn ? "O" : "X") + " current player";

  if (!winner && !cells.includes("")) {
    message = "Draw";
  }

  const reset = () => {
    setCells(["", "", "", "", "", "", "", "", ""]);
    const cellElements = document.querySelectorAll(".cell");
    cellElements.forEach((cell) => {
      cell.firstChild.classList.remove(CROSS_CLASS);
      cell.firstChild.classList.remove(CIRCLE_CLASS);
    });
  };

  return (
    <section className="main">
      <div className="header">
        <h1 className="title">Tic Tac Toe</h1>
        <h3 className={winner ? "winner-title" : "current-player"}>
          {message}
        </h3>
        <button
          className={winner || message === "Draw" ? "reset" : "hidden"}
          onClick={reset}>
          ↪️
        </button>
      </div>
      <div className="game-container">
        {cells.map((cell, index) => {
          return (
            <div
              className="cell"
              key={index}
              id={index}
              onClick={winner ? null : handleClick}>
              <div></div>
            </div>
          );
        })}
      </div>
    </section>
  );
  function checkWin(cells) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        return cells[a];
      }
    }
    return null;
  }
}

export default App;
