import { NextRequest, NextResponse } from "next/server";
import { myApi, pokeApi } from "../instance";

const MAX = 1050 as const;
const MIN = 1 as const;

export async function POST(request: NextRequest) {
  try {
    const { count }: QuizRequestI = await request.json();

    const indexList = Array.from(
      { length: count },
      () => Math.floor(Math.random() * (MAX - MIN + 1)) + MIN
    );

    const quizList = await Promise.all(
      indexList.map(async (index) => {
        const res = await myApi.get(`/pokemon/${index}`);
        const data = res.data;
        return data;
      })
    );

    return NextResponse.json(quizList);
  } catch (error) {
    return NextResponse.json({ error: "요청 바디 확인 필요" }, { status: 400 });
  }
}
