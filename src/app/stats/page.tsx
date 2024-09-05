"use client";

import { StatsI } from "@/interface/response";
import fetcher from "@/utils/fetcher";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";

const BAR_COLORS = [
  "#F60001",
  "#E97B2D",
  "#F0C92E",
  "#638CE8",
  "#75C24B",
  "#EF5584",
];

export default function Home() {
  const { data, isLoading } = useSWR<StatsI>("/api/stats/180", fetcher);
  const [value, setValue] = useState("");
  const [curState, setCurState] = useState<"ing" | "correct" | "wrong">("ing");

  function onSubmit() {
    setCurState(data?.name == value ? "correct" : "wrong");
  }

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (curState !== "ing") {
    return (
      <div>
        {data && (
          <Image src={data.image} alt={data.name} width={200} height={200} />
        )}
        <div>정답 : {data?.name}</div>
        <div>답변 : {value}</div>
        <div>{curState == "correct" ? "맞았습니다" : "틀렸습니다"}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-1">
        {data?.stats.map((item, idx) => {
          const widthPercent = `${Math.round((item.value / 255) * 100)}%`;
          return (
            <div key={item.name} className="flex justify-between">
              <div className="w-20">{item.name}: </div>
              <div className="w-10">{item.value}</div>
              <div className="w-full flex flex-1">
                <div
                  className="h-5"
                  style={{
                    width: widthPercent,
                    backgroundColor: BAR_COLORS[idx],
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <form onSubmit={onSubmit}>
        <input value={value} onChange={(e) => setValue(e.target.value)} />
        <button>입력</button>
      </form>
    </div>
  );
}
