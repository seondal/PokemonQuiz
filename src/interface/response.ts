export interface StatI {
  name: string;
  value: number;
}

export interface TypeI {
  name: string;
  color: string;
}
export interface PokemonI {
  name: string;
  image: string;
  stats: StatI[];
  total: number;
  generation: string;
  types: TypeI[];
}
