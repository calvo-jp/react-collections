import { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import IPokemon from "types/pokemon";

interface Props {
  pokemons: IPokemon[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    revalidate: 60,
    props: {
      pokemons: [
        {
          id: 1,
          image: "/unknown.png",
          name: "pikachu",
          abilities: [],
          moves: [],
          stats: [],
          types: [],
        },
      ],
    },
  };
};

const Pokemons: NextPage<Props> = ({ pokemons }) => {
  return (
    <div className="mx-auto flex min-h-screen max-w-screen-lg flex-col">
      <Header />

      <main className="grow p-6">
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pokemons.map((pokemon) => (
            <div key={pokemon.id}>
              <PokemonCard data={pokemon} />
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

const Header = () => {
  return (
    <header className="overflow-hidden bg-gradient-to-r from-orange-400 to-amber-400 p-6 lg:rounded-b-3xl">
      <div>
        <h1 className="text-6xl font-bold text-white">Pokedex</h1>
        <p className="-mt-1 ml-1 text-sm text-amber-100">Powered by pokeapi</p>
      </div>
    </header>
  );
};

interface PokemonCardProps {
  data: IPokemon;
}

const PokemonCard = ({ data }: PokemonCardProps) => {
  return (
    <Link href={"/pokemons/" + data.id} passHref>
      <a className="block rounded-lg border border-transparent bg-white p-8 shadow-md transition-all duration-300 hover:border-orange-300 hover:ring-2 hover:ring-orange-200 focus:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-200">
        <div className="flex h-[100px] items-center justify-center overflow-hidden relative">
          <Image src={data.image} alt="" layout="fill" />
        </div>

        <div className="mt-8">
          <h2 className="text-2xl">{data.name}</h2>

          <ul className="flex flex-wrap items-center gap-x-1 text-xs text-gray-400">
            <li>Abilities: {data.abilities.length}</li>
            <li className="h-[3px] w-[3px] rounded-full bg-gray-200"></li>
            <li>Moves: {data.moves.length}</li>
            <li className="h-[3px] w-[3px] rounded-full bg-gray-200"></li>
            <li>Types: {data.types.length}</li>
          </ul>
        </div>
      </a>
    </Link>
  );
};

export default Pokemons;
