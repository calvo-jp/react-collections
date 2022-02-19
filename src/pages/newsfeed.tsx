import ChevronLeftIcon from '@heroicons/react/outline/ChevronLeftIcon';
import ChevronRightIcon from '@heroicons/react/outline/ChevronRightIcon';
import SparklesIcon from '@heroicons/react/solid/SparklesIcon';
import StarIcon from '@heroicons/react/solid/StarIcon';
import ThumbUpIcon from '@heroicons/react/solid/ThumbUpIcon';
import recipes from 'assets/samples/json/recipes.json';
import RecipeCard from 'layouts/cards/Recipe';
import Header from 'layouts/Header';
import Head from 'next/head';
import Image from 'next/image';
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
    <main>
      <div className="grid grid-cols-12 px-8">
        <div className="col-span-9 py-8">
          <Featured />

          <div className="mt-8">
            <Popular />
          </div>
        </div>

        <div className="sticky top-header col-span-3 self-start py-8 px-8">
          <New />

          <p className="text-sm mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
            laboriosam at molestiae, obcaecati vero alias veniam magnam nemo
            atque quaerat saepe commodi reprehenderit velit nesciunt facere?
            Corrupti aperiam tempora amet!
          </p>
        </div>
      </div>
    </main>
  );
};

const New = () => {
  return (
    <React.Fragment>
      <HeadLine label="New" icon={SparklesIcon} />

      <div></div>
    </React.Fragment>
  );
};

const Popular = () => {
  return (
    <React.Fragment>
      <HeadLine label="Popular" icon={ThumbUpIcon} />

      <div className="grid grid-cols-2 gap-4 mt-2">
        {[
          ...recipes,
          ...recipes,
          ...recipes,
          ...recipes,
          ...recipes,
          ...recipes,
        ].map((recipe, idx) => (
          <RecipeCard key={idx} data={recipe} height={200} />
        ))}
      </div>
    </React.Fragment>
  );
};

const Featured = () => {
  return (
    <div>
      <HeadLine label="Featured" icon={StarIcon} />

      <div className="relative w-full">
        <button className="absolute z-10 -left-5 top-[50%] translate-y-[-50%] rounded-full bg-black opacity-50 p-2">
          <ChevronLeftIcon className="w-8 h-8 stroke-white" />
        </button>

        <button className="absolute z-10 -right-5 top-[50%] translate-y-[-50%] rounded-full bg-black opacity-50 p-2">
          <ChevronRightIcon className="w-8 h-8 stroke-white" />
        </button>

        <div className="flex gap-2 mt-4 w-full overflow-x-auto">
          {[
            ...recipes,
            ...recipes,
            ...recipes,
            ...recipes,
            ...recipes,
            ...recipes,
          ].map((recipe) => (
            <div
              key={recipe.id}
              className="relative basis-[200px] shrink-0 grow-0 w-[200px] h-[200px]"
            >
              <Image
                src={recipe.banner!}
                alt=""
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface HeadLineProps {
  label: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
}

const HeadLine = ({ label, icon: SVGIcon }: HeadLineProps) => {
  return (
    <div className="flex gap-1 items-center">
      <SVGIcon className="basis-6 w-6 h-6" />
      <Heading>{label}</Heading>
    </div>
  );
};

const Heading: React.FC = ({ children }) => {
  return (
    <h2 className="uppercase font-heading font-heading-thick text-lg">
      {children}
    </h2>
  );
};

export default NewsFeed;
