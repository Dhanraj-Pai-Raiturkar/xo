export type TMatrix = (string | number | null)[][];
export type TMatrixRow = (string | number | null)[];
export type TMatrixValues = 'X' | 'O' | '';

export interface IPlayer {
  identifier: TMatrixValues;
  name: string;
  score: number;
}
export interface IPlayerSlice {
  players: IPlayer[];
  addPlayers: (player: IPlayer) => { players: IPlayer[] };
  getCpuIdentifier: () => TMatrixValues;
  getPlayerIdentifier: () => TMatrixValues;
  updateScore: (identifier: TMatrixValues) => void;
  resetScores: () => void;
}
export interface ISettingSlice {
  gameMode: 'single' | 'multi' | undefined;
  setGameMode: (gameMode: 'single' | 'multi') => void;
}
export interface IGameSlice {
  currentTurn: boolean;
  inProgress: boolean;
  matrix: TMatrix;
  resetMatrix: () => void;
  setCurrentTurn: () => void;
  setMatrix: (row: number, col: number, identifier: TMatrixValues) => TMatrix;
  winningPositions: number[][] | null;
  setWinningPositions: (positions: number[][] | null) => void;
  setInProgress: (status: boolean) => void;
}
export interface IStoreState extends IPlayerSlice, ISettingSlice, IGameSlice {}

export interface IAddPlayerForm {
  name: string;
  identifier: TMatrixValues;
}
