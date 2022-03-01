import IPokemon from "../types/pokemon";

type Dict = Record<string, any>;

export default function normalizePokemonObject(data: Dict): IPokemon {
  return {
    id: data.id,
    name: data.name,
    image: data.sprites.other.dream_world.front_default,
    types: data.types.map((type: Dict) => type.type.name),
    abilities: data.abilities.map((ability: Dict) => ability.ability.name),
    moves: data.moves.map((move: Dict) => move.move.name).slice(0, 10),
    stats: data.stats.map((stat: Dict) => ({
      value: stat.base_stat,
      name: stat.stat.name,
    })),
    experience: data.base_experience,
    weight: data.weight,
    height: data.height,
    __original__: data,
  };
}
