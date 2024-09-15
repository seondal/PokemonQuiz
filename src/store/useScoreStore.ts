import { create } from "zustand";

interface ScoreStoreI {
  solved: number;
  correct: () => void;
  reset: () => void;
}

const useScoreStore = create<ScoreStoreI>((set) => ({
  solved: 0,
  correct: () => set((state) => ({ solved: state.solved + 1 })),
  reset: () => set({ solved: 0 }),
}));

export default useScoreStore;
