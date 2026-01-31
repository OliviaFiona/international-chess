import '../styles/Square.css';

function Square({
  row,
  col,
  piece,
  pieceColor,
  isSelected,
  isPossibleMove,
  onSquareClick,
}) {
  const isLight = (row + col) % 2 === 0;
  const squareClass = `square ${isLight ? 'light' : 'dark'} ${isSelected ? 'selected' : ''} ${isPossibleMove ? 'possible-move' : ''}`;
  const pieceClass = `piece ${pieceColor ? `piece-${pieceColor}` : ''}`;

  return (
    <div className={squareClass} onClick={() => onSquareClick(row, col)}>
      {piece && <span className={pieceClass}>{piece}</span>}
      {isPossibleMove && !piece && <span className="move-indicator"></span>}
    </div>
  );
}

export default Square;
