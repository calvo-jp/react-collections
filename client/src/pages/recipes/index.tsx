import items from 'assets/json/recipes.json';
import Header from 'layouts/Header';
import RecipeCard from 'layouts/RecipeCard';
import Sidebar from 'layouts/Sidebar';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import * as React from 'react';
import IRecipe from 'types/recipe';

interface Props {
  items: IRecipe[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      items,
    },
    revalidate: false,
  };
};

const Recipes: NextPage<Props> = ({ items }) => {
  return (
    <React.Fragment>
      <Head>
        <title>Recipes</title>
      </Head>

      <div className="min-h-screen bg-gray-100">
        <Header authorized />

        <main className="flex-grow">
          <div className="flex">
            <Sidebar />

            <section className="p-8 flex-grow">
              <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 grid-flow-row-dense">
                {items.map((item) => (
                  <RecipeCard key={item.id} data={item} />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
};

export default Recipes;
