import { ISettingSlice } from '../../interface';

export const settingSlice: (set: any, get: any) => ISettingSlice = (set) => ({
  gameMode: undefined,
  setGameMode: (gameMode: 'single' | 'multi') => {
    set((state: ISettingSlice) => ({ ...state, gameMode }));
  },
});
