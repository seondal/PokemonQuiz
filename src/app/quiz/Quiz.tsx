"use client";

import { PokemonI } from "@/interface/response";
import Image from "next/image";
import { useState } from "react";

interface QuizI {
  data: PokemonI;
  goNext: () => void;
  children: React.ReactNode;
}

export default function Quiz({ data, goNext, children }: QuizI) {
  const [value, setValue] = useState("");
  const [curState, setCurState] = useState<"ing" | "correct" | "wrong">("ing");

  function onSubmit() {
    setCurState(data.name == value ? "correct" : "wrong");
  }

  function onClickNext() {
    setCurState("ing");
    setValue("");
    goNext();
  }

  if (curState !== "ing") {
    return (
      <div>
        <Image
          priority
          src={data.image}
          alt={data.name}
          width={200}
          height={200}
        />
        <div>정답 : {data.name}</div>
        <div>답변 : {value}</div>
        <div>{curState == "correct" ? "맞았습니다" : "틀렸습니다"}</div>
        <button onClick={onClickNext}>다음</button>
      </div>
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
