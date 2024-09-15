"use client";

import { useState } from "react";
import useQuizStore from "@/store/useQuizStore";
import Quiz from "./Quiz";

export default function QuizPage() {
  const { quizList } = useQuizStore();
  const [curNumber, setCurNumber] = useState(0);

  return (
    <>
      <Quiz
        data={quizList[curNumber]}
        goNext={() => setCurNumber((state) => state + 1)}
      />
    </>
  );
}
