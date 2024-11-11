export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { myApi, pokeApi } from "../instance";
import { GenerationI } from "@/interface/response";

export async function GET(request: NextRequest) {
  const res = await pokeApi.get(`/generation`);
  const data = res.data;

  const count = data.count;

  const results = [];
  for (let item = 1; item <= count; item++) {
    const genRes = await myApi.get<GenerationI>(`/generation/${item}`);
    const genData = genRes.data;
    results.push({
      id: item,
      name: genData.name,
      pokemonCount: genData.pokemonCount,
      pokemonIndexes: genData.pokemonIndexes,
    });
  }

  return NextResponse.json(results);
}
