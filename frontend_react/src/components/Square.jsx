import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Square component: accessible button representing a single cell.
 * Props:
 * - value: 'X' | 'O' | null
 * - onClick: () => void
 * - disabled: boolean
 * - ariaLabel: string
 */
function Square({ value, onClick, disabled, ariaLabel }) {
  const symbolClass = value === 'X' ? 'square-x' : value === 'O' ? 'square-o' : '';
  return (
    <button
      type="button"
      className={`square-btn ${symbolClass} ${disabled ? 'disabled' : ''}`}
      onClick={onClick}
      aria-disabled={disabled ? 'true' : 'false'}
      aria-label={ariaLabel}
    >
      {value}
    </button>
  );
}

export default Square;
