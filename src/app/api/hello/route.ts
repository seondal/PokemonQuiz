// app/api/hello/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    // 외부 오픈 API 호출 (예: Chuck Norris Jokes API)
    const response = await axios.get("https://api.chucknorris.io/jokes/random");

    // API에서 받은 데이터
    const joke = response.data.value;

    // 성공적으로 응답
    return NextResponse.json({ joke });
  } catch (error) {
    // 에러 처리
    return NextResponse.json(
      { message: "Failed to fetch the joke" },
      { status: 500 }
    );
  }
}
