import React from 'react';
import '../styles/Square.css';

function Square({ 
  row, 
  col, 
  piece, 
  isSelected, 
  isPossibleMove, 
  onSquareClick 
}) {
  const isLight = (row + col) % 2 === 0;
  const squareClass = `square ${isLight ? 'light' : 'dark'} ${isSelected ? 'selected' : ''} ${isPossibleMove ? 'possible-move' : ''}`;

  return (
    <div 
      className={squareClass}
      onClick={() => onSquareClick(row, col)}
    >
      {piece && (
        <span className="piece">{piece}</span>
      )}
      {isPossibleMove && !piece && (
        <span className="move-indicator"></span>
      )}
    </div>
  );
}

export default Square;


