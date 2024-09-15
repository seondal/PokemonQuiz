import { PathI } from "@/interface/type";
import { create } from "zustand";

interface SettingStoreI {
  mode: PathI;
  setMode: (mode: PathI) => void;

  count: number;
  setCount: (count: number) => void;

  generation: number[];
  scopeSum: number;
  addGen: (gen: number, cnt: number) => void;
  removeGen: (gen: number, cnt: number) => void;
  clearGen: () => void;
}

const useSettingStore = create<SettingStoreI>((set) => ({
  mode: "stat",
  setMode: (selectedMode: PathI) => set({ mode: selectedMode }),

  count: 10,
  setCount: (count) => set({ count }),

  generation: [],
  scopeSum: 0,
  addGen: (gen, cnt) =>
    set((state) => ({
      generation: [...state.generation, gen],
      scopeSum: state.scopeSum + cnt,
    })),
  removeGen: (gen, cnt) =>
    set((state) => ({
      generation: state.generation.filter((item) => item !== gen),
      scopeSum: state.scopeSum - cnt,
    })),
  clearGen: () => set((state) => ({ generation: [], scopeSum: 0 })),
}));

export default useSettingStore;
