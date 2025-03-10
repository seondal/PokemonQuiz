import { PokeAPI } from "pokeapi-types";

interface DataIncludingNamesI {
  names: PokeAPI.Name[];
}

export default function findLocalizedName<T extends DataIncludingNamesI>(
  data: T,
  locale: string
) {
  return data.names.find((item) => item.language.name === locale)?.name;
}
