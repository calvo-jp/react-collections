import IPokemon from "types/pokemon";
import normalizePokemonObject from "utils/normalizePokemonObject";

interface IResult {
  name: string;
  url: string;
}

interface IPaginated {
  count: number;
  results: IResult[];
  next: string | null;
  previous: string | null;
}

/**
 *
 * @param url - the pokedex api url to fetch
 *
 * @example
 * ```javascript
 * const url = "https://pokeapi.co/api/v2/pokemon?limit=12";
 * const data = await getPokemons(url);
 * ...
 * ```
 *
 */
const getPokemons = async (url: string) => {
  const response = await fetch(url);
  const data: IPaginated = await response.json();

  const promises = data.results.map(({ url }) => fetch(url));
  const results = await Promise.allSettled(promises);
  const pokemons: IPokemon[] = [];

  for (const result of results) {
    if (result.status === "fulfilled") {
      const parsed = await result.value.json();
      const pokemon = normalizePokemonObject(parsed);

      pokemons.push(pokemon);
    }
  }

  return { ...data, results: pokemons };
};

export default getPokemons;
