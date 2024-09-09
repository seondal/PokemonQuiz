import { NextRequest } from "next/server";
import { PokeAPI } from "pokeapi-types";
import instance from "../../instance";

const LANGUAGE = "ko" as const;

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

  const name = data2.names.find(
    (item) => item.language.name === LANGUAGE
  )?.name;

  const image =
    data.sprites.other === undefined
      ? data.sprites.front_default
      : data.sprites.other["official-artwork"]?.front_default;

  const stats = await Promise.all(
    data.stats.map(async (item, idx) => {
      const statData = (await instance.get<PokeAPI.Stat>(item.stat.url)).data;
      const statName = statData.names.find(
        (item) => item.language.name === LANGUAGE
      )?.name;
      return {
        name: statName,
        value: item.base_stat,
      };
    })
  );

  const total = stats.reduce((sum, item) => sum + item.value, 0);

  const types = await Promise.all(
    data.types.map(async (item) => {
      const typeData = (await instance.get<PokeAPI.Type>(item.type.url)).data;
      const typeId = typeData.id;
      const typeName = typeData.names.find(
        (item) => item.language.name === LANGUAGE
      )?.name;
      return typeName;
    })
  );
  if (data.types.length === 1) {
    types.push("단일타입");
  }

  const generation = data2.generation.name;

  return Response.json({ name, image, stats, total, types, generation });
}
