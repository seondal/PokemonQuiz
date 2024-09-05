import { POKE_API } from "@/constants/ENV";
import { NextRequest } from "next/server";
import { PokeAPI } from "pokeapi-types";
import instance from "../../instance";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const res = await instance.get<PokeAPI.Pokemon>(`/pokemon/${params.id}`);
  const data = res.data;

  const name = data.name;
  const stats = data.stats.map((item) => ({
    name: item.stat.name,
    value: item.base_stat,
  }));

  return Response.json({ name, stats });
}
