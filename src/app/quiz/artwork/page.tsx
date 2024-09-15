"use client";

import useQuizStore from "@/store/useQuizStore";
import Image from "next/image";

export default function ArtworkQuizPage() {
  const { quizList, curNumber } = useQuizStore();
  const data = quizList[curNumber];
  console.log("🚀 ~ ArtworkQuizPage ~ data:", data);

  return (
    <>
      <Image src={data.image} width={200} height={200} alt="" />
    </>
  );
}
