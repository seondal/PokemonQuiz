"use client";

import useQuizStore from "@/store/useQuizStore";
import { useState } from "react";
import EndingPage from "./Ending";
import Result from "./Result";
import useScoreStore from "@/store/useScoreStore";

interface QuizI {
  children: React.ReactNode;
}

export default function Quiz({ children }: QuizI) {
  const { quizList, curNumber, goNextNumber } = useQuizStore();
  const { correct } = useScoreStore();
  const data = quizList[curNumber];

  const [value, setValue] = useState("");
  const [curState, setCurState] = useState<"ing" | "correct" | "wrong">("ing");

  function onSubmit() {
    const isCorrect = data.name === value;
    if (isCorrect) {
      correct();
    }
    setCurState(isCorrect ? "correct" : "wrong");
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
    <div className="container">
      <h5 className="text-center">
        {curNumber + 1} / {quizList.length}
      </h5>
      {children}
      <hr />
      <form onSubmit={onSubmit} role="group">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
          required
        />
        <input type="submit" value="입력" />
      </form>
    </div>
  );
}
