import { Grid2, Stack } from '@mui/material';
import Cell, { TCellProps } from './Cell';
import { TMatrix, TMatrixRow, TMatrixValues } from '../interface';
import useStore from '../store';
import {
  checkWinner,
  cpuPlayAction,
  getEmptyCells,
  getWinningPositions,
  pauseExecution,
} from '../Utils';
import { useEffect } from 'react';

const Board: React.FC = () => {
  const matrix = useStore((state) => state.matrix);
  const setMatrix = useStore((state) => state.setMatrix);
  const getPlayerIdentifier = useStore((state) => state.getPlayerIdentifier);
  const getCpuIdentifier = useStore((state) => state.getCpuIdentifier);
  const winningPositions = useStore((state) => state.winningPositions);
  const setWinningPositions = useStore((state) => state.setWinningPositions);
  const resetMatrix = useStore((state) => state.resetMatrix);
  const setInProgress = useStore((state) => state.setInProgress);
  const inProgress = useStore((state) => state.inProgress);
  const currentTurn = useStore((state) => state.currentTurn);
  const setCurrentTurn = useStore((state) => state.setCurrentTurn);
  const updateScore = useStore((state) => state.updateScore);
  const handleCellClick = async (cellData: TCellProps) => {
    if (!inProgress) return;
    console.log(cellData);
    const { row, column } = cellData;
    setMatrix(row, column, getPlayerIdentifier());
    setCurrentTurn();
  };
  const handleEndOfRound = (identifier: TMatrixValues) => {
    const winningPositions = getWinningPositions(matrix, identifier);
    setWinningPositions(winningPositions);
  };
  const cpuAction = async (updatedMatrix: TMatrix) => {
    await pauseExecution(1000);
    inProgress &&
      setMatrix(
        ...cpuPlayAction(
          updatedMatrix as TMatrix,
          getCpuIdentifier(),
          getPlayerIdentifier()
        )
      );
    setCurrentTurn();
  };
  useEffect(() => {
    let timeout: number;
    let winner = checkWinner(matrix);
    if (winner) {
      updateScore(winner as TMatrixValues);
      handleEndOfRound(winner as TMatrixValues);
      timeout = setTimeout(() => {
        setInProgress(false);
        resetMatrix();
      }, 2000);
      return () => {
        clearTimeout(timeout);
      };
    }
    if (!getEmptyCells(matrix)?.length) {
      timeout = setTimeout(() => {
        setInProgress(false);
        resetMatrix();
      }, 2000);
      return () => {
        clearTimeout(timeout);
      };
    }
    inProgress && !currentTurn && cpuAction(matrix);
    return () => {
      clearTimeout(timeout);
    };
  }, [matrix, inProgress, currentTurn]);
  const getRow = (rowValue: TMatrixRow, rowIndex: number) => {
    return (
      <Grid2 display={'flex'}>
        {rowValue.map((value, columnIndex) => (
          <Cell
            row={rowIndex}
            column={columnIndex}
            value={value as TMatrixValues}
            clickHandler={handleCellClick}
            winCell={
              winningPositions?.filter(
                (position) =>
                  position[0] === rowIndex && position[1] === columnIndex
              )?.length
                ? true
                : false
            }
          />
        ))}
      </Grid2>
    );
  };
  return (
    <Stack>
      {matrix?.map((rowValue, rowIndex) => getRow(rowValue, rowIndex))}
    </Stack>
  );
};

export default Board;
