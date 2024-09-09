"use client";

import { QuizListT } from "@/interface/response";
import useQuizStore from "@/store/useQuizStore";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const LATEST_GENERATION = 9;
const GENERATION = Array.from(
  { length: LATEST_GENERATION },
  (_, index) => index + 1
);

export default function QuizSetting() {
  const [count, setCount] = useState(10);

  const { setQuizList } = useQuizStore();
  const router = useRouter();

  async function fetchQuiz(): Promise<QuizListT> {
    const res = await fetch(`/api/quiz`, {
      method: "POST",
      body: JSON.stringify({
        count,
      }),
    });
    return res.json();
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = await fetchQuiz();
    setQuizList(data);
    router.push("/quiz");
  }

  return (
    <form onSubmit={onSubmit}>
      <p>문제 갯수</p>
      <div>
        <input
          type="number"
          id="count"
          required
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value))}
        />
        <label htmlFor="count">개</label>
      </div>
      <br />
      <p>출제 범위 (업데이트 예정)</p>
      {/* {GENERATION.map((item) => (
          <div key={item}>
            <input
              type="checkbox"
              name="generation"
              id="generation"
              value={item}
              defaultChecked
            />
            <label>{item}세대</label>
          </div>
        ))} */}
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
