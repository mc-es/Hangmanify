import type { StateCreator } from 'zustand';

export interface GlobalTextState {
  readonly text: string; // ❌ useGlobalText().text = "Hello"
  readonly setText: (input: string) => void; // ❌ useGlobalText().setText = null
}

export const createGlobalTextSlice: StateCreator<GlobalTextState> = (set) => ({
  text: '',
  setText: (newText) => set({ text: newText }),
});
