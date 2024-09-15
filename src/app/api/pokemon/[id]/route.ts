import { NextRequest, NextResponse } from "next/server";
import { PokeAPI } from "pokeapi-types";
import { pokeApi } from "../../instance";
import findLocalizedName from "@/utils/localize";
import TYPE_COLORS from "@/constants/TYPE_COLORS";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const res = await pokeApi.get<PokeAPI.Pokemon>(`/pokemon/${params.id}`);
  const data = res.data;

  const res2 = await pokeApi.get<PokeAPI.PokemonSpecies>(
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
      const statData = (await pokeApi.get<PokeAPI.Stat>(item.stat.url)).data;
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
      const typeData = (await pokeApi.get<PokeAPI.Type>(item.type.url)).data;
      const typeId = typeData.id;
      const typeColor = TYPE_COLORS.find((item) => item.id === typeId)?.color;
      const typeName = findLocalizedName(typeData);
      return { name: typeName, color: typeColor };
    })
  );
  if (data.types.length === 1) {
    types.push({ name: "단일타입", color: "#000000" });
  }

  const genData = (await pokeApi.get<PokeAPI.Generation>(data2.generation.url))
    .data;
  const generation = findLocalizedName(genData);

  return NextResponse.json({ name, image, stats, total, types, generation });
}
