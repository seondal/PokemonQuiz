"use client";

import { PokemonI } from "@/interface/response";
import fetcher from "@/utils/fetcher";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";
import StatGraph from "./StatGraph";

export default function Home() {
  const [index, setIndex] = useState(Math.floor(Math.random() * 1025 + 1));
  const { data, isLoading } = useSWR<PokemonI>(
    `/api/pokemon/${index}`,
    fetcher
  );
  const [value, setValue] = useState("");
  const [curState, setCurState] = useState<"ing" | "correct" | "wrong">("ing");

  function onSubmit() {
    setCurState(data?.name == value ? "correct" : "wrong");
  }

  if (isLoading || !data) {
    return <div>로딩중</div>;
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
        <button onClick={() => setCurState("ing")}>다음</button>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <StatGraph total={data.total} stats={data.stats} />
        <input value={value} onChange={(e) => setValue(e.target.value)} />
        <button>입력</button>
        <div style={{ backgroundColor: data.types[0].color }}>
          {data.types[0].name}
        </div>
        <div style={{ backgroundColor: data.types[1].color }}>
          {data.types[1].name}
        </div>
        <div>{data.generation}</div>
      </form>
    </div>
  );
}
