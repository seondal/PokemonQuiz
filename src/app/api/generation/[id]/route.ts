import { NextRequest, NextResponse } from "next/server";
import { PokeAPI } from "pokeapi-types";
import { pokeApi } from "../../instance";
import findLocalizedName from "@/utils/localize";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const res = await pokeApi.get<PokeAPI.Generation>(`/generation/${params.id}`);
  const data = res.data;

  const name = findLocalizedName(data);

  const pokemonIndexes = data.pokemon_species.map((item) => {
    const splitted = item.url.split("/");
    return parseInt(splitted[splitted.length - 2]);
  });

  const pokemonCount = pokemonIndexes.length;

  return NextResponse.json({ name, pokemonIndexes, pokemonCount });
}
