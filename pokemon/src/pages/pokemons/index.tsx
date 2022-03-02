import ChevronUpIcon from "@heroicons/react/outline/ChevronUpIcon";
import pokeball from "assets/pokeball.png";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import IPokemon from "types/pokemon";
import getPokemons from "utils/getPokemons";

interface Props {
  data: Awaited<ReturnType<typeof getPokemons>>;
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const data = await getPokemons(process.env.API_BASE_URL + "?limit=30");

  return {
    props: {
      data,
    },
  };
};

const Pokemons: NextPage<Props> = ({ data: initialData }) => {
  const [showScrollTopButton, setShowScollTopButton] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState(initialData);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleScroll = () => {
    if (window.scrollY > 0) setShowScollTopButton(true);
    else setShowScollTopButton(false);
  };

  const loadMore = async () => {
    if (!data.next) return;

    setFetching(true);

    try {
      const newData = await getPokemons(data.next);

      setData((oldData) => ({
        ...newData,
        results: [...oldData.results, ...newData.results],
      }));
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      setData(initialData);
      setFetching(false);
      setShowScollTopButton(false);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [initialData]);

  return (
    <>
      <Head>
        <title>Pokemons</title>
      </Head>

      <div className="mx-auto flex min-h-screen max-w-screen-lg flex-col">
        <Header />

        <main className="grow p-6">
          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.results.map((pokemon) => (
              <div key={pokemon.id}>
                <PokemonCard data={pokemon} />
              </div>
            ))}
          </section>

          {data.next && (
            <div className="text-center">
              <button
                className="p-4 text-sm"
                onClick={loadMore}
                disabled={fetching}
              >
                {fetching && <span className="text-gray-500">Loading...</span>}
                {!fetching && <span>Load more</span>}
              </button>
            </div>
          )}
        </main>

        {showScrollTopButton && <ScrollToTopButton onClick={scrollToTop} />}
      </div>
    </>
  );
};

const ScrollToTopButton = (props: React.ComponentProps<"button">) => {
  return (
    <button
      className="fixed right-4 bottom-4 z-20 flex rounded-full bg-gradient-to-r from-orange-500 to-amber-600 p-4 shadow-md"
      {...props}
    >
      <ChevronUpIcon className="h-6 w-6 stroke-white" />
    </button>
  );
};

const Header = () => {
  return (
    <header className="relative overflow-hidden bg-gradient-to-r from-orange-400 to-amber-400 p-6 lg:rounded-b-3xl">
      <div>
        <h1 className="text-6xl font-bold text-white">Pokedex</h1>
        <p className="-mt-1 ml-1 text-sm text-amber-100">Powered by pokeapi</p>
      </div>

      <div className="absolute -right-6 top-2 opacity-40">
        <Image
          src={pokeball}
          alt=""
          width={160}
          height={160}
          placeholder="blur"
        />
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
      <a className="block rounded-sm border border-transparent bg-white p-8 shadow-md transition-all duration-300 hover:border-orange-300 hover:ring-2 hover:ring-orange-200 focus:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-200">
        <div className="relative flex h-[100px] items-center justify-center overflow-hidden">
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
