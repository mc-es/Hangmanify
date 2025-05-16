import type { StateCreator } from 'zustand';

export interface CounterState {
  count: number;
  decrease: () => void;
  increase: () => void;
}

export const createCounterSlice: StateCreator<CounterState> = (set) => ({
  count: 0,
  decrease: () => set((state: CounterState) => ({ count: state.count - 1 })),
  increase: () => set((state: CounterState) => ({ count: state.count + 1 })),
});
