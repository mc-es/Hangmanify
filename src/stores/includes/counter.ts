import type { StateCreator } from 'zustand';

export interface CounterState {
  count: number;
  increase: () => void;
  decrease: () => void;
}

export const createCounterSlice: StateCreator<CounterState> = (set) => ({
  count: 0,
  increase: () => set((state: CounterState) => ({ count: state.count + 1 })),
  decrease: () => set((state: CounterState) => ({ count: state.count - 1 })),
});
