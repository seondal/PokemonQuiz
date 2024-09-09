import { QuizListT } from "@/interface/response";
import { create } from "zustand";

interface QuizStoreI {
  quizList: QuizListT;
  setQuizList: (newQuizList: QuizListT) => void;
}

const useQuizStore = create<QuizStoreI>((set) => ({
  quizList: [],
  setQuizList: (newQuizList) => set({ quizList: newQuizList }),
}));

export default useQuizStore;
