import { NextRequest } from "next/server";
import { PokeAPI } from "pokeapi-types";
import instance from "../../instance";

const STAT_KOR_NAME = [
  "체력",
  "공격",
  "방어",
  "특수공격",
  "특수방어",
  "스피드",
];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const res = await instance.get<PokeAPI.Pokemon>(`/pokemon/${params.id}`);
  const data = res.data;

  const res2 = await instance.get<PokeAPI.PokemonSpecies>(
    `/pokemon-species/${params.id}`
  );
  const data2 = res2.data;

  const name = data2.names.find((item) => item.language.name === "ko")?.name;

  const image =
    data.sprites.other === undefined
      ? data.sprites.front_default
      : data.sprites.other["official-artwork"]?.front_default;

  const stats = data.stats.map((item, idx) => ({
    name: STAT_KOR_NAME[idx],
    value: item.base_stat,
  }));

  const total = stats.reduce((sum, item) => sum + item.value, 0);

  const types = data.types.map((item) => item.type.name);
  if (data.types.length === 1) {
    types.push("단일타입");
  }

  const generation = data2.generation.name;

  return Response.json({ name, image, stats, total, types, generation });
}
