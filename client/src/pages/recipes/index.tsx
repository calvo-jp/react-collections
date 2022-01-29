import recipes from 'assets/json/recipes.json';
import Layout from 'layouts/Layout';
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import IRecipe from 'types/recipe';
import Rating from 'widgets/Rating';

interface Props {
  items: IRecipe[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      items: recipes,
    },
    revalidate: false,
  };
};

const Recipes: NextPage<Props> = ({ items }) => {
  return (
    <Layout>
      <Head>
        <title>Recipes</title>
      </Head>

      <div className="grid gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 grid-flow-row-dense">
        {items.map((item) => (
          <Recipe key={item.id} data={item} />
        ))}
      </div>
    </Layout>
  );
};

interface RecipeProps {
  data: IRecipe;
}

const Recipe = ({ data }: RecipeProps) => {
  // prettier-ignore
  const {
    id,
    name,
    banner,
    summary,
    description
  } = data

  return (
    <Link href={'/recipes/'.concat(id.toString())} passHref>
      <a
        key={name}
        className="block bg-white shadow-md hover:ring-4 hover:ring-blue-200 group relative"
      >
        <figure className="relative overflow-hidden h-[250px]">
          <div className="absolute w-full h-full z-20 top-0 left-0 bg-black bg-opacity-50 hidden group-hover:flex items-center justify-center" />

          <Image
            src={banner!}
            alt=""
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </figure>

        <article className="p-4">
          <h4 className="text-lg">{name}</h4>

          <p className="text-sm text-gray-700 truncate">{description}</p>

          <div className="mt-2">
            <Rating value={summary.rating} />
          </div>
        </article>
      </a>
    </Link>
  );
};

export default Recipes;
