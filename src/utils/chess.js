// 国际象棋游戏逻辑

// 棋子类型
export const PIECE_TYPES = {
  PAWN: 'pawn',
  ROOK: 'rook',
  KNIGHT: 'knight',
  BISHOP: 'bishop',
  QUEEN: 'queen',
  KING: 'king'
};

// 棋子颜色
export const COLORS = {
  WHITE: 'white',
  BLACK: 'black'
};

// 创建初始棋盘
export function createInitialBoard() {
  const board = Array(8).fill(null).map(() => Array(8).fill(null));

  // 放置白棋
  board[7][0] = { type: PIECE_TYPES.ROOK, color: COLORS.WHITE };
  board[7][1] = { type: PIECE_TYPES.KNIGHT, color: COLORS.WHITE };
  board[7][2] = { type: PIECE_TYPES.BISHOP, color: COLORS.WHITE };
  board[7][3] = { type: PIECE_TYPES.QUEEN, color: COLORS.WHITE };
  board[7][4] = { type: PIECE_TYPES.KING, color: COLORS.WHITE };
  board[7][5] = { type: PIECE_TYPES.BISHOP, color: COLORS.WHITE };
  board[7][6] = { type: PIECE_TYPES.KNIGHT, color: COLORS.WHITE };
  board[7][7] = { type: PIECE_TYPES.ROOK, color: COLORS.WHITE };
  for (let i = 0; i < 8; i++) {
    board[6][i] = { type: PIECE_TYPES.PAWN, color: COLORS.WHITE };
  }

  // 放置黑棋
  board[0][0] = { type: PIECE_TYPES.ROOK, color: COLORS.BLACK };
  board[0][1] = { type: PIECE_TYPES.KNIGHT, color: COLORS.BLACK };
  board[0][2] = { type: PIECE_TYPES.BISHOP, color: COLORS.BLACK };
  board[0][3] = { type: PIECE_TYPES.QUEEN, color: COLORS.BLACK };
  board[0][4] = { type: PIECE_TYPES.KING, color: COLORS.BLACK };
  board[0][5] = { type: PIECE_TYPES.BISHOP, color: COLORS.BLACK };
  board[0][6] = { type: PIECE_TYPES.KNIGHT, color: COLORS.BLACK };
  board[0][7] = { type: PIECE_TYPES.ROOK, color: COLORS.BLACK };
  for (let i = 0; i < 8; i++) {
    board[1][i] = { type: PIECE_TYPES.PAWN, color: COLORS.BLACK };
  }

  return board;
}

// 检查位置是否在棋盘内
function isValidPosition(row, col) {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
}

// 检查是否可以移动（基础规则）
export function isValidMove(board, fromRow, fromCol, toRow, toCol, currentPlayer) {
  const piece = board[fromRow][fromCol];
  
  if (!piece || piece.color !== currentPlayer) {
    return false;
  }

  const targetPiece = board[toRow][toCol];
  if (targetPiece && targetPiece.color === currentPlayer) {
    return false; // 不能吃自己的棋子
  }

  // 根据棋子类型检查移动
  switch (piece.type) {
    case PIECE_TYPES.PAWN:
      return isValidPawnMove(board, fromRow, fromCol, toRow, toCol, piece.color);
    case PIECE_TYPES.ROOK:
      return isValidRookMove(board, fromRow, fromCol, toRow, toCol);
    case PIECE_TYPES.KNIGHT:
      return isValidKnightMove(board, fromRow, fromCol, toRow, toCol);
    case PIECE_TYPES.BISHOP:
      return isValidBishopMove(board, fromRow, fromCol, toRow, toCol);
    case PIECE_TYPES.QUEEN:
      return isValidQueenMove(board, fromRow, fromCol, toRow, toCol);
    case PIECE_TYPES.KING:
      return isValidKingMove(board, fromRow, fromCol, toRow, toCol);
    default:
      return false;
  }
}

// 兵的移动规则
function isValidPawnMove(board, fromRow, fromCol, toRow, toCol, color) {
  const direction = color === COLORS.WHITE ? -1 : 1;
  const startRow = color === COLORS.WHITE ? 6 : 1;
  const targetPiece = board[toRow][toCol];

  // 向前移动
  if (fromCol === toCol) {
    if (targetPiece) return false; // 前方有棋子
    if (toRow === fromRow + direction) return true;
    if (fromRow === startRow && toRow === fromRow + 2 * direction) {
      return !board[fromRow + direction][fromCol]; // 起始位置可以移动两格
    }
  }
  
  // 斜吃
  if (Math.abs(toCol - fromCol) === 1 && toRow === fromRow + direction) {
    return !!targetPiece && targetPiece.color !== color;
  }

  return false;
}

// 车的移动规则
function isValidRookMove(board, fromRow, fromCol, toRow, toCol) {
  if (fromRow !== toRow && fromCol !== toCol) return false;
  
  const rowStep = fromRow === toRow ? 0 : (toRow > fromRow ? 1 : -1);
  const colStep = fromCol === toCol ? 0 : (toCol > fromCol ? 1 : -1);
  
  let currentRow = fromRow + rowStep;
  let currentCol = fromCol + colStep;
  
  while (currentRow !== toRow || currentCol !== toCol) {
    if (board[currentRow][currentCol]) return false;
    currentRow += rowStep;
    currentCol += colStep;
  }
  
  return true;
}

// 马的移动规则
function isValidKnightMove(board, fromRow, fromCol, toRow, toCol) {
  const rowDiff = Math.abs(toRow - fromRow);
  const colDiff = Math.abs(toCol - fromCol);
  return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
}

// 象的移动规则
function isValidBishopMove(board, fromRow, fromCol, toRow, toCol) {
  if (Math.abs(toRow - fromRow) !== Math.abs(toCol - fromCol)) return false;
  
  const rowStep = toRow > fromRow ? 1 : -1;
  const colStep = toCol > fromCol ? 1 : -1;
  
  let currentRow = fromRow + rowStep;
  let currentCol = fromCol + colStep;
  
  while (currentRow !== toRow || currentCol !== toCol) {
    if (board[currentRow][currentCol]) return false;
    currentRow += rowStep;
    currentCol += colStep;
  }
  
  return true;
}

// 后的移动规则
function isValidQueenMove(board, fromRow, fromCol, toRow, toCol) {
  return isValidRookMove(board, fromRow, fromCol, toRow, toCol) ||
         isValidBishopMove(board, fromRow, fromCol, toRow, toCol);
}

// 王的移动规则
function isValidKingMove(board, fromRow, fromCol, toRow, toCol) {
  const rowDiff = Math.abs(toRow - fromRow);
  const colDiff = Math.abs(toCol - fromCol);
  return (rowDiff <= 1 && colDiff <= 1) && (rowDiff + colDiff > 0);
}

// 获取所有可能的移动位置
export function getPossibleMoves(board, row, col, currentPlayer) {
  const moves = [];
  
  for (let toRow = 0; toRow < 8; toRow++) {
    for (let toCol = 0; toCol < 8; toCol++) {
      if (isValidMove(board, row, col, toRow, toCol, currentPlayer)) {
        moves.push({ row: toRow, col: toCol });
      }
    }
  }
  
  return moves;
}

// 执行移动
export function makeMove(board, fromRow, fromCol, toRow, toCol) {
  const newBoard = board.map(row => [...row]);
  newBoard[toRow][toCol] = newBoard[fromRow][fromCol];
  newBoard[fromRow][fromCol] = null;
  return newBoard;
}

// 获取棋子的Unicode符号
export function getPieceSymbol(piece) {
  if (!piece) return '';
  
  const symbols = {
    [COLORS.WHITE]: {
      [PIECE_TYPES.KING]: '♔',
      [PIECE_TYPES.QUEEN]: '♕',
      [PIECE_TYPES.ROOK]: '♖',
      [PIECE_TYPES.BISHOP]: '♗',
      [PIECE_TYPES.KNIGHT]: '♘',
      [PIECE_TYPES.PAWN]: '♙'
    },
    [COLORS.BLACK]: {
      [PIECE_TYPES.KING]: '♚',
      [PIECE_TYPES.QUEEN]: '♛',
      [PIECE_TYPES.ROOK]: '♜',
      [PIECE_TYPES.BISHOP]: '♝',
      [PIECE_TYPES.KNIGHT]: '♞',
      [PIECE_TYPES.PAWN]: '♟'
    }
  };
  
  return symbols[piece.color]?.[piece.type] || '';
}


