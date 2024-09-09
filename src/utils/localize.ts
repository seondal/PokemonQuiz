import { PokeAPI } from "pokeapi-types";

const LANGUAGE = "ko" as const;

interface DataIncludingNamesI {
  names: PokeAPI.Name[];
}

export default function findLocalizedName<T extends DataIncludingNamesI>(
  data: T
) {
  return data.names.find((item) => item.language.name === LANGUAGE)?.name;
}
