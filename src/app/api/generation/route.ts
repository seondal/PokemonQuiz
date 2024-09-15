import { NextRequest, NextResponse } from "next/server";
import { myApi, pokeApi } from "../instance";
import { GenerationI } from "@/interface/response";

export async function GET(request: NextRequest) {
  const res = await pokeApi.get<{ count: number }>(`/generation`);
  const data = res.data;

  const count = data.count;

  const results: GenerationI[] = await Promise.all(
    Array.from({ length: count }, (_, index) => index + 1).map(async (item) => {
      const genData = (await myApi.get<GenerationI>(`/generation/${item}`))
        .data;
      return {
        id: item,
        name: genData.name,
        pokemonCount: genData.pokemonCount,
        pokemonIndexes: genData.pokemonIndexes,
      };
    })
  );

  return NextResponse.json(results);
}
