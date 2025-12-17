import React from 'react';
import Square from './Square';

/**
 * PUBLIC_INTERFACE
 * Board component renders a 3x3 grid of squares.
 * Props:
 * - squares: Array(9) of 'X' | 'O' | null
 * - onSquareClick: function(index: number): void
 * - winner: 'X' | 'O' | null
 */
function Board({ squares, onSquareClick, winner }) {
  const renderSquare = (i) => {
    const value = squares[i];
    const disabled = Boolean(squares[i]) || Boolean(winner);
    return (
      <Square
        key={i}
        value={value}
        onClick={() => onSquareClick(i)}
        disabled={disabled}
        ariaLabel={`Square ${i + 1}`}
      />
    );
  };

  return (
    <div className="board" role="grid" aria-label="Game board 3 by 3">
      {Array.from({ length: 9 }).map((_, i) => renderSquare(i))}
    </div>
  );
}

export default Board;
