import { create } from 'zustand';
import { IStoreState } from '../interface';
import { playerSlice } from './slices/playerSlice';
import { settingSlice } from './slices/settingSlice';
import { gameSlice } from './slices/gameSlice';
import { devtools } from 'zustand/middleware';

// const useStore = create<IStoreState>((set) => ({
//   ...playerSlice(set),
//   ...settingSlice(set),
//   ...gameSlice(set),
// }));

const useStore = create<IStoreState>()(
  devtools((set, get) => ({
    ...playerSlice(set, get),
    ...settingSlice(set, get),
    ...gameSlice(set, get),
  }))
);

export default useStore;
