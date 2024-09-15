"use client";

import useQuizStore from "@/store/useQuizStore";
import StatGraph from "./StatGraph";
import Hint from "./Hint";

export default function StatQuizPage() {
  const { quizList, curNumber } = useQuizStore();
  const data = quizList[curNumber];

  return (
    <>
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
    </>
  );
}
