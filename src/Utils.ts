import { TMatrix, TMatrixValues } from './interface';

export const createMatrix = (rows: number, columns: number) => {
  return Array.from({ length: rows }, () => Array(columns).fill(''));
};

export const checkWinner = (
  matrix: (string | null | number)[][]
): string | null => {
  const size = matrix.length;
  // Check rows
  for (let row = 0; row < size; row++) {
    if (matrix[row][0] && matrix[row].every((cell) => cell === matrix[row][0]))
      return matrix[row][0] as string;
  }
  // Check columns
  for (let col = 0; col < size; col++) {
    if (matrix[0][col] && matrix.every((row) => row[col] === matrix[0][col]))
      return matrix[0][col] as string;
  }
  // Check main diagonal
  if (matrix[0][0] && matrix.every((row, index) => row[index] === matrix[0][0]))
    return matrix[0][0] as string;
  // Check anti-diagonal
  if (
    matrix[0][size - 1] &&
    matrix.every((row, index) => row[size - 1 - index] === matrix[0][size - 1])
  )
    return matrix[0][size - 1] as string;
  return null;
};

// export const cpuPlayAction = (
//   matrix: (string | null | number)[][]
// ): [row: number, col: number, identifier: 'O'] => {
//   const emptyCells: [number, number][] = [];
//   for (let row = 0; row < matrix.length; row++) {
//     for (let col = 0; col < matrix[row].length; col++) {
//       if (matrix[row][col] === '') {
//         emptyCells.push([row, col]);
//       }
//     }
//   }
//   // if (emptyCells.length === 0) return null;
//   const randomIndex = Math.floor(Math.random() * emptyCells.length);
//   const [row, col] = emptyCells[randomIndex];
//   return [row, col, 'O'];
// };

export const pauseExecution = (milliseconds: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const cpuPlayAction = (
  matrix: TMatrix,
  cpuIdentifier: TMatrixValues,
  playerIdentifier: TMatrixValues
): [number, number, TMatrixValues] => {
  const size = matrix.length;

  // Helper function to check for a winning move
  const checkWinningMove = (
    identifier: TMatrixValues
  ): [number, number] | null => {
    // Check rows
    for (let row = 0; row < size; row++) {
      const emptyCells = matrix[row].filter((cell) => cell === '').length;
      const cpuCells = matrix[row].filter((cell) => cell === identifier).length;
      if (emptyCells === 1 && cpuCells === size - 1) {
        const col = matrix[row].indexOf('');
        return [row, col];
      }
    }

    // Check columns
    for (let col = 0; col < size; col++) {
      const column = matrix.map((row) => row[col]);
      const emptyCells = column.filter((cell) => cell === '').length;
      const cpuCells = column.filter((cell) => cell === identifier).length;
      if (emptyCells === 1 && cpuCells === size - 1) {
        const row = column.indexOf('');
        return [row, col];
      }
    }

    // Check main diagonal
    const mainDiagonal = matrix.map((row, index) => row[index]);
    const emptyMainDiagonalCells = mainDiagonal.filter(
      (cell) => cell === ''
    ).length;
    const cpuMainDiagonalCells = mainDiagonal.filter(
      (cell) => cell === identifier
    ).length;
    if (emptyMainDiagonalCells === 1 && cpuMainDiagonalCells === size - 1) {
      const index = mainDiagonal.indexOf('');
      return [index, index];
    }

    // Check anti-diagonal
    const antiDiagonal = matrix.map((row, index) => row[size - 1 - index]);
    const emptyAntiDiagonalCells = antiDiagonal.filter(
      (cell) => cell === ''
    ).length;
    const cpuAntiDiagonalCells = antiDiagonal.filter(
      (cell) => cell === identifier
    ).length;
    if (emptyAntiDiagonalCells === 1 && cpuAntiDiagonalCells === size - 1) {
      const index = antiDiagonal.indexOf('');
      return [index, size - 1 - index];
    }

    return null;
  };

  // Try to win
  let move = checkWinningMove(cpuIdentifier);
  if (move) {
    return [move[0], move[1], cpuIdentifier];
  }

  // Try to block the player
  move = checkWinningMove(playerIdentifier);
  if (move) {
    return [move[0], move[1], cpuIdentifier];
  }

  // Make a random move
  const emptyCells: [number, number][] = [];
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (matrix[row][col] === '') {
        emptyCells.push([row, col]);
      }
    }
  }
  const randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  return [randomMove[0], randomMove[1], cpuIdentifier];
};

export const getWinningPositions = (
  matrix: TMatrix,
  identifier: TMatrixValues
): [number, number][] | null => {
  const size = matrix.length;
  const winningPositions: [number, number][] = [];

  // Check rows
  for (let row = 0; row < size; row++) {
    if (matrix[row].every((cell) => cell === identifier)) {
      for (let col = 0; col < size; col++) {
        winningPositions.push([row, col]);
      }
      return winningPositions;
    }
  }

  // Check columns
  for (let col = 0; col < size; col++) {
    if (matrix.every((row) => row[col] === identifier)) {
      for (let row = 0; row < size; row++) {
        winningPositions.push([row, col]);
      }
      return winningPositions;
    }
  }

  // Check main diagonal
  if (matrix.every((row, index) => row[index] === identifier)) {
    for (let index = 0; index < size; index++) {
      winningPositions.push([index, index]);
    }
    return winningPositions;
  }

  // Check anti-diagonal
  if (matrix.every((row, index) => row[size - 1 - index] === identifier)) {
    for (let index = 0; index < size; index++) {
      winningPositions.push([index, size - 1 - index]);
    }
    return winningPositions;
  }

  return null;
};

export const getEmptyCells = (matrix: TMatrix): [number, number][] => {
  const emptyCells: [number, number][] = [];
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === '') {
        emptyCells.push([row, col]);
      }
    }
  }
  return emptyCells;
};
