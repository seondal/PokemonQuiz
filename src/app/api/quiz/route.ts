import { NextRequest, NextResponse } from "next/server";

const MAX = 1050 as const;
const MIN = 1 as const;

export async function POST(request: NextRequest) {
  try {
    const { count }: QuizRequestI = await request.json();

    const quizList = Array.from(
      { length: count },
      () => Math.floor(Math.random() * (MAX - MIN + 1)) + MIN
    );

    return NextResponse.json(quizList);
  } catch (error) {
    return NextResponse.json({ error: "요청 바디 확인 필요" }, { status: 400 });
  }
}
