"use client";

import { useState } from "react";
import useQuizStore from "@/store/useQuizStore";
import Quiz from "../Quiz";
import StatGraph from "./StatGraph";
import Hint from "./Hint";

export default function QuizPage() {
  const { quizList } = useQuizStore();
  const [curNumber, setCurNumber] = useState(0);

  const data = quizList[curNumber];

  return (
    <>
      <Quiz data={data} goNext={() => setCurNumber((state) => state + 1)}>
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
      </Quiz>
    </>
  );
}
