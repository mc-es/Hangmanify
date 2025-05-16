import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { useShallow } from 'zustand/shallow';

import { type CounterState, createCounterSlice } from './includes/counter';
import { createGlobalTextSlice, type GlobalTextState } from './includes/text';

type StoreState = CounterState & GlobalTextState;

const useStore = create<StoreState>()(
  persist(
    (set, get, api) => ({
      ...createCounterSlice(set, get, api),
      ...createGlobalTextSlice(set, get, api),
    }),
    {
      name: 'storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state: StoreState) => ({
        count: state.count,
      }),
    }
  )
);

export const useCounter = (): CounterState => {
  const { count, decrease, increase } = useStore<CounterState>(
    useShallow((state: CounterState) => ({
      count: state.count,
      decrease: state.decrease,
      increase: state.increase,
    }))
  );

  return { count, decrease, increase };
};

export const useGlobalText = (): GlobalTextState => {
  const { text, setText } = useStore<GlobalTextState>(
    useShallow((state: GlobalTextState) => ({
      text: state.text,
      setText: state.setText,
    }))
  );

  return { text, setText };
};
