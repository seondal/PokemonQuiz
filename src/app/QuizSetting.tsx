"use client";

import { GenerationI, QuizListT } from "@/interface/response";
import { PathI } from "@/interface/type";
import useQuizStore from "@/store/useQuizStore";
import useSettingStore from "@/store/useSettingStore";
import fetcher from "@/utils/fetcher";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import useSWR from "swr";

const MAX_COUNT = 50;

const MODE: Array<{ name: string; path: PathI }> = [
  { name: "종족값 보고 맞추기", path: "stat" },
  { name: "공식이미지 보고 맞추기", path: "artwork" },
] as const;

export default function QuizSetting() {
  const { data: genList } = useSWR<GenerationI[]>("/api/generation", fetcher);
  const {
    mode,
    setMode,
    count,
    setCount,
    generation,
    addGen,
    removeGen,
    scopeSum,
    clearGen,
  } = useSettingStore();

  const [loading, setLoading] = useState(false);
  const { setQuizList } = useQuizStore();
  const router = useRouter();

  async function fetchQuiz(): Promise<QuizListT> {
    const res = await fetch(`/api/quiz`, {
      method: "POST",
      body: JSON.stringify({
        count,
        generation,
      }),
    });
    return res.json();
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (generation.length === 0) {
      alert("한 개 이상의 세대를 선택해주세요!");
    } else {
      setLoading(true);
      const data = await fetchQuiz();
      setQuizList(data);
      router.push(`/quiz/${mode}`);
    }
  }

  if (loading) {
    return <div>로딩중...</div>;
  }

  return (
    <form onSubmit={onSubmit}>
      <ul>
        {MODE.map((item) => (
          <li key={item.path}>
            <input
              type="radio"
              id={item.path}
              name="mode"
              checked={mode === item.path}
              onChange={() => setMode(item.path)}
            />
            <label htmlFor={item.path}>{item.name}</label>
          </li>
        ))}
      </ul>
      <p>문제 갯수</p>
      <div>
        <input
          type="number"
          id="count"
          required
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value))}
          max={MAX_COUNT}
        />
        <label htmlFor="count">개</label>
      </div>
      <br />
      <p>출제 범위</p>
      <div> {scopeSum} 마리</div>

      {genList === undefined ? (
        <p>로딩중</p>
      ) : (
        <>
          <div>
            <input
              id="all"
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  genList.forEach((item) => {
                    addGen(item.id, item.pokemonCount);
                  });
                } else {
                  clearGen();
                }
              }}
            />
            <label htmlFor="all">전체선택</label>
          </div>
          {genList.map((item) => (
            <div key={item.id}>
              <input
                type="checkbox"
                id={item.name}
                value={item.id}
                checked={
                  generation.find((tmp) => tmp === item.id) !== undefined
                }
                onChange={(e) => {
                  if (e.target.checked) {
                    addGen(item.id, item.pokemonCount);
                  } else {
                    removeGen(item.id, item.pokemonCount);
                  }
                }}
              />
              <label htmlFor={item.name}>
                {item.name} ({item.pokemonCount}마리)
              </label>
            </div>
          ))}
        </>
      )}
      {/* <div>
          <input type="checkbox" name="final" id="final" />
          <label htmlFor="final">최종 진화형만</label>
        </div>
        <br /> */}
      <p>힌트 여부 (업데이트 예정)</p>
      {/* <div>
          <input type="checkbox" name="gen" id="gen" defaultChecked />
          <label htmlFor="gen">세대 힌트</label>
        </div>
        <div>
          <input type="checkbox" name="type" id="type" defaultChecked />
          <label htmlFor="type">타입 힌트</label>
        </div>
        <br /> */}
      <button type="submit">문제 풀러 가기</button>
    </form>
  );
}
