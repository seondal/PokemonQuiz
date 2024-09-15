"use client";

import { useState } from "react";
import useQuizStore from "@/store/useQuizStore";
import Quiz from "../Quiz";
import Image from "next/image";

export default function QuizPage() {
  const { quizList } = useQuizStore();
  const [curNumber, setCurNumber] = useState(0);

  const data = quizList[curNumber];

  return (
    <>
      <Quiz data={data} goNext={() => setCurNumber((state) => state + 1)}>
        <>
          <Image src={data.image} width={200} height={200} alt="" />
        </>
      </Quiz>
    </>
  );
}
