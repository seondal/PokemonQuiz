export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { myApi, pokeApi } from "../instance";
import { GenerationI } from "@/interface/response";

export async function GET(request: NextRequest) {
  const res = await pokeApi.get(`/generation`);
  const data = res.data;

  const count = data.count;

  const results = await Promise.all(
    Array.from({ length: count }, (_, index) => index + 1).map(async (item) => {
      try {
        const genRes = await myApi.get<GenerationI>(`/generation/${item}`);
        const genData = genRes.data;
        return {
          id: item,
          name: genData.name,
          pokemonCount: genData.pokemonCount,
          pokemonIndexes: genData.pokemonIndexes,
        };
      } catch (error: any) {
        console.error(
          `Error fetching generation ${item}:`,
          error.response?.data || error.message
        );
        return { id: item, error: error.response?.data };
      }
    })
  );
  return NextResponse.json(results);
}
