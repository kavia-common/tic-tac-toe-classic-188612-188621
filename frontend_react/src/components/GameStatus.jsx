import React from 'react';

/**
 * PUBLIC_INTERFACE
 * GameStatus displays the current status of the game with live region for accessibility.
 * Props:
 * - status: string - human readable status like "Turn: X", "X wins!", "Draw"
 */
function GameStatus({ status }) {
  const lower = (status || '').toLowerCase();
  const isXTurn = lower.includes('turn: x');
  const isOTurn = lower.includes('turn: o');
  const xWin = lower.includes('x wins');
  const oWin = lower.includes('o wins');
  const isDraw = lower.includes('draw');

  const spanClass =
    xWin ? 'win'
    : oWin ? 'win o'
    : isXTurn ? 'x'
    : isOTurn ? 'o'
    : isDraw ? ''
    : '';

  return (
    <p className="status" aria-live="polite" aria-atomic="true">
      <span className={spanClass}>{status}</span>
    </p>
  );
}

export default GameStatus;
