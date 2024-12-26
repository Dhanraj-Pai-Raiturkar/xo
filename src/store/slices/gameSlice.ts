import {
  IGameSlice,
  IStoreState,
  TMatrix,
  TMatrixValues,
} from '../../interface';
import { createMatrix } from '../../Utils';

export const gameSlice: (set: any, get: any) => IGameSlice = (set) => ({
  currentTurn: true,
  matrix: createMatrix(3, 3),
  winningPositions: null,
  inProgress: false,
  setInProgress: (status: boolean) => {
    set((state: IStoreState) => ({ ...state, inProgress: status }));
  },
  setCurrentTurn: () => {
    set((state: IStoreState) => ({
      ...state,
      currentTurn: !state.currentTurn,
    }));
  },
  setMatrix: (row: number, col: number, identifier: TMatrixValues) => {
    let newMatrix: TMatrix = [];
    set((state: IStoreState) => {
      const prevMatrix = state.matrix;
      newMatrix = prevMatrix.map((r, rowIndex) =>
        rowIndex === row
          ? r.map((cell, colIndex) => (colIndex === col ? identifier : cell))
          : r
      );
      return { ...state, matrix: newMatrix };
    });
    return newMatrix;
  },
  resetMatrix: () =>
    set((state: IStoreState) => ({
      ...state,
      matrix: createMatrix(3, 3),
      winningPositions: null,
      inProgress: true,
    })),
  setWinningPositions: (positions: number[][] | null) => {
    set((state: IStoreState) => ({
      ...state,
      winningPositions: positions,
    }));
  },
});
