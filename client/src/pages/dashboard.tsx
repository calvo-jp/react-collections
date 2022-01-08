import BellIcon from '@heroicons/react/solid/BellIcon';
import HeartIcon from '@heroicons/react/solid/HeartIcon';
import StarIcon from '@heroicons/react/solid/StarIcon';
import recipes from 'assets/json/recipes.json';
import Layout from 'layouts/Layout';
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import * as React from 'react';
import IRecipe from 'types/recipe';

interface Props {
  items: IRecipe[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      items: recipes,
    },
    revalidate: 60 * 60 * 24,
  };
};

const Dashboard: NextPage<Props> = ({ items }) => {
  return (
    <Layout>
      <Head>
        <title>Dashboard</title>
      </Head>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-6 flex items-center gap-4 shadow-md">
            <StarIcon className="w-20 h-20 fill-white" />

            <div className="flex-col gap-2 text-white">
              <div className="text-sm">Average Rating</div>
              <div className="text-3xl">1.1k+</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-400 to-violet-400 p-6 flex items-center gap-4 shadow-md">
            <BellIcon className="w-20 h-20 fill-white" />

            <div className="flex-col gap-2 text-white">
              <div className="text-sm">Notifications</div>
              <div className="text-3xl">1.1k+</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-400 to-pink-400 p-6 flex items-center gap-4 shadow-md">
            <HeartIcon className="w-20 h-20 fill-white" />

            <div className="flex-col gap-2 text-white">
              <div className="text-sm">Favorites</div>
              <div className="text-3xl">16</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
