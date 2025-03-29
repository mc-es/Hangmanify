import type { StateCreator } from 'zustand';

export interface GlobalTextState {
  text: string;
  setText: (input: string) => void;
}

export const createGlobalTextSlice: StateCreator<GlobalTextState> = (set) => ({
  text: '',
  setText: (newText) => set({ text: newText }),
});
