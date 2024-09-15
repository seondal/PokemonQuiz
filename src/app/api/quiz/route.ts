import { NextRequest, NextResponse } from "next/server";
import { myApi, pokeApi } from "../instance";
import { PokeAPI } from "pokeapi-types";

export async function POST(request: NextRequest) {
  try {
    const { count, generation }: QuizRequestI = await request.json();

    let targetIndexes: number[] = [];
    await Promise.all(
      generation.map(async (gen) => {
        const genRes = await pokeApi.get<PokeAPI.Generation>(
          `/generation/${gen}`
        );
        const genData = genRes.data;
        genData.pokemon_species.forEach((item) => {
          const splitted = item.url.split("/");
          const index = parseInt(splitted[splitted.length - 2]);
          targetIndexes.push(index);
        });
      })
    );

    const indexList = targetIndexes
      .slice()
      .sort(() => 0.5 - Math.random())
      .slice(0, count);

    const quizList = await Promise.all(
      indexList.map(async (index) => {
        const res = await myApi.get(`/pokemon/${index}`);
        return res.data;
      })
    );

    return NextResponse.json(quizList);
  } catch (error) {
    return NextResponse.json({ error: "요청 바디 확인 필요" }, { status: 400 });
  }
}
