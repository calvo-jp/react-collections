import ChevronLeftIcon from "@heroicons/react/outline/ChevronLeftIcon";
import CogIcon from "@heroicons/react/solid/CogIcon";
import SpinnerIcon from "components/icons/Spinner";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import IPokemon from "types/pokemon";
import getPokemons from "utils/getPokemons";
import normalizePokemonObject from "utils/normalizePokemonObject";

interface Params {
  [key: string]: string;
  id: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const pokemons = await getPokemons();
  const paths = pokemons.map((pokemon) => ({
    params: { id: pokemon.id.toString() },
  }));

  return { paths, fallback: true };
};

interface Props {
  pokemon: IPokemon;
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const id = params?.id;
  const response = await fetch(process.env.API_BASE_URL! + id);

  if (!response.ok) return { notFound: true };

  const parsed = await response.json();
  const pokemon = normalizePokemonObject(parsed);

  return {
    props: {
      pokemon,
      revalidate: 60 * 60 * 24 * 7,
    },
  };
};

const Pokemon: NextPage<Props> = ({ pokemon }) => {
  const router = useRouter();

  if (router.isFallback) return <Loader />;

  return (
    <>
      <Head>
        <title>Pokemons | {pokemon.name}</title>
      </Head>

      <div className="mx-auto max-w-screen-md">
        <Header data={pokemon} />

        <div className="flex flex-col gap-4 p-6">
          <Stats items={pokemon.stats} />
          <Moves items={pokemon.moves} />
          <Abilities items={pokemon.abilities} />
        </div>
      </div>
    </>
  );
};

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 flex h-full w-full place-items-center">
      <SpinnerIcon width={150} height={150} />
    </div>
  );
};

const Stats = ({ items }: Itemable<IPokemon["stats"][number]>) => {
  return (
    <Card>
      <CardHeading label="Stats" />
      <CardContent>
        {items.map((stat) => (
          <div key={stat.name}>
            <div className="text-sm">{stat.name}</div>

            <div className="flex items-center gap-1">
              <progress
                value={stat.value}
                className="progress-bar h-1 w-full rounded-md bg-gray-200"
                max={100}
              />

              <p className="text-xs">{stat.value}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const Moves = ({ items }: Itemable<string>) => {
  return (
    <Card>
      <CardHeading label="Moves" />
      <CardContent>
        <ul className="flex flex-wrap gap-1">
          {items.map((move) => (
            <li className="rounded-md bg-amber-100 p-1 px-2 text-sm" key={move}>
              {move}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const Abilities = ({ items }: Itemable<string>) => {
  return (
    <Card>
      <CardHeading label="Abilities" />
      <CardContent>
        <ul>
          {items.map((ability) => (
            <li key={ability}>{ability}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

interface Itemable<T> {
  items: T[];
}

const Card = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <div className="col-span-2 rounded-sm bg-white p-8 shadow-md md:col-span-1">
      {children}
    </div>
  );
};

interface CardHeadingProps {
  label: string;
}

const CardHeading = ({ label }: CardHeadingProps) => {
  return (
    <div className="flex items-center gap-1">
      <CogIcon className="block h-4 w-4 fill-gray-400" />
      <h3 className="text-xl text-gray-500">{label}</h3>
    </div>
  );
};

const CardContent = ({ children }: React.PropsWithChildren<{}>) => {
  return <div className="mt-6">{children}</div>;
};

interface HeaderProps {
  data: IPokemon;
}

const Header = ({ data }: HeaderProps) => {
  return (
    <div className="relative bg-gradient-to-r from-orange-400 to-amber-500 text-white md:rounded-b-3xl">
      <BackButton />

      <div className="flex flex-col items-center gap-2 p-8 md:flex-row md:gap-6">
        <section>
          <Avatar src={data.image} />
        </section>

        <section className="text-center">
          <h1 className="text-3xl font-bold">{data.name}</h1>

          <Types data={data.types} />
        </section>
      </div>
    </div>
  );
};

interface TypesProps {
  data: string[];
}

const Types = ({ data }: TypesProps) => {
  return (
    <div className="mt-2 flex gap-1 md:mt-1">
      {data.map((i) => (
        <div
          key={i}
          className="rounded-full bg-white bg-opacity-30 px-4 py-2 text-sm font-semibold"
        >
          {i}
        </div>
      ))}
    </div>
  );
};

interface AvatarProps {
  src: string;
}

const Avatar = ({ src }: AvatarProps) => {
  return (
    <div className="relative flex h-[150px] w-[150px] overflow-hidden rounded-full bg-white bg-opacity-30">
      <div className="relative m-auto h-[80%] w-[80%]">
        <Image src={src} alt="" layout="fill" />
      </div>
    </div>
  );
};

const BackButton = () => {
  return (
    <Link href="/pokemons" passHref>
      <a className="absolute top-4 left-4 rounded-full border-gray-100 bg-black from-orange-400 to-amber-500 p-2 opacity-30 hover:opacity-50 md:-left-8 md:block md:border-4 md:bg-gradient-to-r md:p-3 md:opacity-100 md:hover:opacity-100">
        <ChevronLeftIcon className="h-6 w-6 stroke-white md:h-8 md:w-8" />
      </a>
    </Link>
  );
};

export default Pokemon;
