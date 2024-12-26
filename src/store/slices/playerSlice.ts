import {
  IPlayer,
  IPlayerSlice,
  IStoreState,
  TMatrixValues,
} from '../../interface';

export const playerSlice: (set: any, get: any) => IPlayerSlice = (
  set,
  get
) => ({
  players: [] as IPlayer[],
  resetScores: () => {
    set((state: IStoreState) => {
      const players = state.players.map((player) => {
        player.score = 0;
        return player;
      });
      return { ...state, players };
    });
  },
  addPlayers: (player: IPlayer) =>
    set((state: IPlayerSlice) => {
      return { ...state, players: [...state.players, player] };
    }),
  getCpuIdentifier: () => {
    const state = get() as IStoreState;
    return state.players.find((player) => player.name === 'CPU')!.identifier;
  },
  getPlayerIdentifier: () => {
    const state = get() as IStoreState;
    return state.players.find((player) => player.name !== 'CPU')!.identifier;
  },
  updateScore: (indentifier: TMatrixValues) => {
    set((state: IStoreState) => {
      const players = state.players.map((player) => {
        if (player.identifier === indentifier) {
          player.score += 1;
        }
        return player;
      });
      return { ...state, players };
    });
  },
});
