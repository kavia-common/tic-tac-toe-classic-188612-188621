import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './App.css';
import Board from './components/Board';
import GameStatus from './components/GameStatus';

/**
 * Utility: calculate the winner for a given board state.
 * @param {Array<string|null>} squares - 9-length array representing the board.
 * @returns {'X'|'O'|null} winner symbol if found, otherwise null.
 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // cols
    [1, 4, 7],
    [2, 5, 8],
    [0, 1, 2], // will be overridden below; keep uniqueness
  ];
  // Correct unique winning lines (restate to avoid duplication confusion)
  const uniqueLines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6],
  ];
  for (const [a,b,c] of uniqueLines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

/**
 * Utility: compute if the board is a draw (all filled and no winner).
 * @param {Array<string|null>} squares
 * @returns {boolean}
 */
function computeDraw(squares) {
  return squares.every(cell => cell) && !calculateWinner(squares);
}

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  }, []);

  const winner = useMemo(() => calculateWinner(squares), [squares]);
  const isDraw = useMemo(() => computeDraw(squares), [squares]);

  // PUBLIC_INTERFACE
  const handleSquareClick = useCallback((index) => {
    if (squares[index] || winner) {
      return; // no-op if occupied or game over
    }
    setSquares(prev => {
      const next = prev.slice();
      next[index] = isXNext ? 'X' : 'O';
      return next;
    });
    setIsXNext(prev => !prev);
  }, [squares, winner, isXNext]);

  // PUBLIC_INTERFACE
  const restart = useCallback(() => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  }, []);

  const statusText = winner
    ? `${winner} wins!`
    : isDraw
      ? 'Draw'
      : `Turn: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="App">
      <header className="App-header">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>

        <div className="game-container" role="application" aria-label="Tic Tac Toe game">
          <h1 className="title">Tic Tac Toe</h1>

          <GameStatus status={statusText} />

          <Board
            squares={squares}
            onSquareClick={handleSquareClick}
            winner={winner}
          />

          <div className="controls">
            <button
              type="button"
              className="btn-restart"
              onClick={restart}
              aria-label="Restart game"
            >
              Restart
            </button>
          </div>

          <p className="legend" aria-hidden="true">
            X uses <span className="legend-x">#3b82f6</span>, O uses <span className="legend-o">#06b6d4</span>
          </p>
        </div>
      </header>
    </div>
  );
}

export default App;
