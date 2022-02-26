import recipes from "assets/samples/json/recipes.json";
import RecipeCard from "layouts/cards/Recipe";
import Layout from "layouts/Layout";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import * as React from "react";
import IRecipe from "types/recipe";

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

      <div className="grid grid-flow-row-dense grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
        {items.map((item) => (
          <RecipeCard key={item.id} data={item} height={250} ratings />
        ))}
      </div>
    </Layout>
  );
};

export default Recipes;
