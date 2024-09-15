import { QuizListT } from "@/interface/response";
import { create } from "zustand";

interface QuizStoreI {
  quizList: QuizListT;
  setQuizList: (newQuizList: QuizListT) => void;

  curNumber: number;
  goNextNumber: () => void;

  reset: () => void;
}

const useQuizStore = create<QuizStoreI>((set) => ({
  quizList: [],
  setQuizList: (newQuizList) => set({ quizList: newQuizList }),

  curNumber: 0,
  goNextNumber: () => set((state) => ({ curNumber: state.curNumber + 1 })),

  reset: () => set({ quizList: [], curNumber: 0 }),
}));

export default useQuizStore;
