import React, { useState } from 'react';
import Square from './Square';
import {
  createInitialBoard,
  getPieceSymbol,
  isValidMove,
  makeMove,
  getPossibleMoves,
  COLORS
} from '../utils/chess';
import '../styles/Board.css';

function Board() {
  const [board, setBoard] = useState(createInitialBoard());
  const [currentPlayer, setCurrentPlayer] = useState(COLORS.WHITE);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [gameStatus, setGameStatus] = useState('游戏进行中');

  // 处理方格点击
  const handleSquareClick = (row, col) => {
    const piece = board[row][col];

    // 如果点击了已选中的方格，取消选择
    if (selectedSquare && selectedSquare.row === row && selectedSquare.col === col) {
      setSelectedSquare(null);
      setPossibleMoves([]);
      return;
    }

    // 如果已经有选中的方格
    if (selectedSquare) {
      // 检查是否可以移动到目标位置
      if (isValidMove(
        board,
        selectedSquare.row,
        selectedSquare.col,
        row,
        col,
        currentPlayer
      )) {
        // 执行移动
        const newBoard = makeMove(
          board,
          selectedSquare.row,
          selectedSquare.col,
          row,
          col
        );
        setBoard(newBoard);
        setCurrentPlayer(currentPlayer === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE);
        setSelectedSquare(null);
        setPossibleMoves([]);
      } else if (piece && piece.color === currentPlayer) {
        // 选择新棋子
        setSelectedSquare({ row, col });
        setPossibleMoves(getPossibleMoves(board, row, col, currentPlayer));
      } else {
        // 无效移动，取消选择
        setSelectedSquare(null);
        setPossibleMoves([]);
      }
    } else if (piece && piece.color === currentPlayer) {
      // 选择新棋子
      setSelectedSquare({ row, col });
      setPossibleMoves(getPossibleMoves(board, row, col, currentPlayer));
    }
  };

  // 渲染棋盘
  const renderBoard = () => {
    const squares = [];
    
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        const pieceSymbol = piece ? getPieceSymbol(piece) : null;
        const isSelected = selectedSquare?.row === row && selectedSquare?.col === col;
        const isPossibleMove = possibleMoves.some(
          move => move.row === row && move.col === col
        );

        squares.push(
          <Square
            key={`${row}-${col}`}
            row={row}
            col={col}
            piece={pieceSymbol}
            pieceColor={piece?.color}
            isSelected={isSelected}
            isPossibleMove={isPossibleMove}
            onSquareClick={handleSquareClick}
          />
        );
      }
    }
    
    return squares;
  };

  // 重置游戏
  const resetGame = () => {
    setBoard(createInitialBoard());
    setCurrentPlayer(COLORS.WHITE);
    setSelectedSquare(null);
    setPossibleMoves([]);
    setGameStatus('游戏进行中');
  };

  return (
    <div className="board-container">
      <div className="game-info">
        <h1>国际象棋</h1>
        <p className="current-player">
          当前回合: {currentPlayer === COLORS.WHITE ? '白棋' : '黑棋'}
        </p>
        <p className="game-status">{gameStatus}</p>
        <button onClick={resetGame} className="reset-button">
          重新开始
        </button>
      </div>
      <div className="board">
        <div className="board-wrapper">
          <div className="board-main">
            {/* 棋盘网格 */}
            <div className="board-grid">
              {renderBoard()}
            </div>
            {/* 右侧行标签：从下到上 1～8 */}
            <div className="board-row-labels">
              {['8', '7', '6', '5', '4', '3', '2', '1'].map((label) => (
                <div key={label} className="row-label">{label}</div>
              ))}
            </div>
          </div>
          <div className="board-bottom">
            {/* 下方列标签：a～h */}
            <div className="board-col-labels">
              {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((label) => (
                <div key={label} className="col-label">{label}</div>
              ))}
            </div>
            <div className="corner-cell"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Board;

