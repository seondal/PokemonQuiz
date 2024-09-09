import { NextRequest } from "next/server";
import { PokeAPI } from "pokeapi-types";
import instance from "../../instance";
import findLocalizedName from "@/utils/localize";

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

  const name = findLocalizedName(data2);

  const image =
    data.sprites.other === undefined
      ? data.sprites.front_default
      : data.sprites.other["official-artwork"]?.front_default;

  const stats = await Promise.all(
    data.stats.map(async (item, idx) => {
      const statData = (await instance.get<PokeAPI.Stat>(item.stat.url)).data;
      const statName = findLocalizedName(statData);
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
      const typeName = findLocalizedName(typeData);
      return typeName;
    })
  );
  if (data.types.length === 1) {
    types.push("단일타입");
  }

  const genData = (await instance.get<PokeAPI.Generation>(data2.generation.url))
    .data;
  const generation = findLocalizedName(genData);

  return Response.json({ name, image, stats, total, types, generation });
}
