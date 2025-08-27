/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { PokemonI } from "@/interface/response";
import Image from "next/image";
import { useCallback, useEffect } from "react";

interface ResultI {
  data: PokemonI;
  state: "correct" | "wrong";
  response: string;
  goNext: () => void;
}
export default function Result({ data, state, response, goNext }: ResultI) {
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.key === "Enter") {
      goNext();
    }
  }, []);
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div>
      <Image
        priority
        src={data.image}
        alt={data.name}
        width={200}
        height={200}
        unoptimized
      />
      <h4>정답 : {data.name}</h4>
      <h4>답변 : {response}</h4>
      <h2>{state == "correct" ? "맞았습니다" : "틀렸습니다"}</h2>
      <button onClick={goNext}>다음</button>
    </div>
  );
}
