import ArrowRightIcon from '@heroicons/react/outline/ArrowRightIcon';
import ChevronDownIcon from '@heroicons/react/outline/ChevronDownIcon';
import ChevronLeftIcon from '@heroicons/react/outline/ChevronLeftIcon';
import ChevronRightIcon from '@heroicons/react/outline/ChevronRightIcon';
import SparklesIcon from '@heroicons/react/solid/SparklesIcon';
import StarIcon from '@heroicons/react/solid/StarIcon';
import ThumbUpIcon from '@heroicons/react/solid/ThumbUpIcon';
import recipes from 'assets/samples/json/recipes.json';
import clsx from 'clsx';
import RecipeCard from 'layouts/cards/Recipe';
import Header from 'layouts/Header';
import Head from 'next/head';
import * as React from 'react';

const NewsFeed = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Newsfeed</title>
      </Head>

      <div className="bg-gray-100 dark:bg-zinc-900 min-h-screen">
        <Header />
        <Main />
      </div>
    </React.Fragment>
  );
};

const Main = () => {
  return (
    <main className="max-w-screen-lg mx-auto">
      <div className="grid grid-cols-12">
        <div className="col-span-8 py-8 pl-8">
          <New />

          <div className="mt-8">
            <Popular />
          </div>
        </div>

        <div className="sticky top-header self-start col-span-4">
          <Featured />
        </div>
      </div>
    </main>
  );
};

const New = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <button className="rounded-full bg-zinc-800 p-2">
            <SparklesIcon className="w-8 h-8" />
          </button>

          <div>
            <h2 className="text-xl uppercase font-heading font-heading-thin [line-height:1rem]">
              New Posts
            </h2>

            <p className="text-sm text-zinc-500">Recently added</p>
          </div>
        </div>

        {/* TODO: add something... */}
      </div>

      <div className="relative w-full">
        <button className="absolute z-10 -left-5 top-[50%] translate-y-[-50%] rounded-full bg-black opacity-50 p-2">
          <ChevronLeftIcon className="w-8 h-8 stroke-white" />
        </button>

        <button className="absolute z-10 -right-5 top-[50%] translate-y-[-50%] rounded-full bg-black opacity-50 p-2">
          <ChevronRightIcon className="w-8 h-8 stroke-white" />
        </button>

        <div className="flex gap-2 mt-4 w-full overflow-x-auto pb-2">
          {[...recipes, ...recipes, ...recipes, ...recipes, ...recipes].map(
            (recipe, idx) => (
              <RecipeCard
                key={idx}
                data={recipe}
                width={225}
                height={150}
                size="sm"
                ratings
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

const Popular = () => {
  return (
    <React.Fragment>
      <div className="flex gap-4 items-center">
        <button className="rounded-full bg-zinc-800 p-2">
          <ThumbUpIcon className="w-8 h-8" />
        </button>

        <div>
          <h2 className="text-xl uppercase font-heading font-heading-thin [line-height:1rem]">
            Popular
          </h2>
          <p className="text-sm text-zinc-500">Most viewed posts</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {[...recipes, ...recipes, ...recipes].map((recipe, idx) => (
          <div key={idx} className={clsx(idx % 3 === 0 && 'col-span-2')}>
            <RecipeCard data={recipe} height={200} size="md" ratings />
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

const Featured = () => {
  return (
    <div className="h-full p-8 relative">
      <div className="flex gap-4 items-center">
        <button className="rounded-full bg-zinc-800 p-2">
          <StarIcon className="w-8 h-8" />
        </button>

        <div>
          <h2 className="text-xl uppercase font-heading font-heading-thin [line-height:1rem]">
            Featured
          </h2>

          <p className="text-sm text-zinc-500">Top rated posts</p>
        </div>
      </div>

      <div className="max-h-[65vh] overflow-y-auto mt-4">
        <div className="flex flex-col gap-4">
          {[...recipes, ...recipes].map((recipe, idx) => (
            <RecipeCard
              key={idx}
              data={recipe}
              height={150}
              size="sm"
              ratings
            />
          ))}
        </div>
      </div>

      <button className="absolute z-10 bottom-[1%] left-[50%] translate-x-[-50%] rounded-full bg-black opacity-50 p-2">
        <ChevronDownIcon className="w-8 h-8 stroke-white" />
      </button>
    </div>
  );
};

export default NewsFeed;
