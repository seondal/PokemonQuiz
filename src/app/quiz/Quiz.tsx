"use client";

import { PokemonI } from "@/interface/response";
import fetcher from "@/utils/fetcher";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";
import StatGraph from "./StatGraph";
import Hint from "./Hint";

interface QuizI {
  data: PokemonI;
  goNext: () => void;
}

export default function Quiz({ data, goNext }: QuizI) {
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
      <StatGraph total={data.total} stats={data.stats} />
      <div className="flex justify-around">
        {data.types.map((item, idx) => (
          <Hint
            key={idx}
            text={item.name}
            color={item.color}
            cover={`타입${idx + 1}`}
          />
        ))}
        <Hint text={data.generation} cover="세대" />
      </div>
      <form onSubmit={onSubmit}>
        <input value={value} onChange={(e) => setValue(e.target.value)} />
        <button>입력</button>
      </form>
    </div>
  );
}
