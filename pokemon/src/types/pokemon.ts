export default interface IPokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  moves: string[];
  abilities: string[];
  stats: Stat[];
}

interface Stat {
  name: string;
  value: number;
}
