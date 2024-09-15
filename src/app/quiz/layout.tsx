"use client";

import useQuizStore from "@/store/useQuizStore";
import { useState } from "react";
import EndingPage from "./Ending";
import Result from "./Result";

interface QuizI {
  children: React.ReactNode;
}

export default function Quiz({ children }: QuizI) {
  const { quizList, curNumber, goNextNumber } = useQuizStore();
  const data = quizList[curNumber];

  const [value, setValue] = useState("");
  const [curState, setCurState] = useState<"ing" | "correct" | "wrong">("ing");

  function onSubmit() {
    setCurState(data.name == value ? "correct" : "wrong");
  }

  function onNext() {
    setCurState("ing");
    setValue("");
    goNextNumber();
  }

  if (quizList.length === curNumber) {
    return <EndingPage />;
  }

  if (curState !== "ing") {
    return (
      <Result data={data} state={curState} response={value} goNext={onNext} />
    );
  }

  return (
    <div>
      {children}
      <form onSubmit={onSubmit}>
        <input value={value} onChange={(e) => setValue(e.target.value)} />
        <button>입력</button>
      </form>
    </div>
  );
}