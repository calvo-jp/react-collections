export default interface IPokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  moves: string[];
  abilities: string[];
  stats: Stat[];
  weight: number;
  height: number;
  experience: number;
  __original__: Record<string, any>;
}

interface Stat {
  name: string;
  value: number;
}
