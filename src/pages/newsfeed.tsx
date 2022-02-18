import SparklesIcon from '@heroicons/react/solid/SparklesIcon';
import StarIcon from '@heroicons/react/solid/StarIcon';
import ThumbUpIcon from '@heroicons/react/solid/ThumbUpIcon';
import recipes from 'assets/samples/json/recipes.json';
import RecipeCard from 'layouts/cards/Recipe';
import Header from 'layouts/Header';
import Head from 'next/head';

const NewsFeed = () => {
  return (
    <>
      <Head>
        <title>Newsfeed</title>
      </Head>

      <div className="bg-gray-100 dark:bg-zinc-900 min-h-screen">
        <Header />
        <Main />
      </div>
    </>
  );
};

const Main = () => {
  return (
    <main className="p-8">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-9">
          <Featured />

          <div className="mt-4">
            <Popular />
          </div>
        </div>

        <div>
          <New />
        </div>
      </div>
    </main>
  );
};

const New = () => {
  return (
    <>
      <HeadLine label="New" icon={SparklesIcon} />

      <div></div>
    </>
  );
};

const Popular = () => {
  return (
    <>
      <HeadLine label="Popular" icon={ThumbUpIcon} />

      <div className="grid grid-cols-2 gap-4 mt-2">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} data={recipe} height={200} />
        ))}
      </div>
    </>
  );
};

const Featured = () => {
  return (
    <div>
      <HeadLine label="Featured" icon={StarIcon} />

      <div className="h-[200px]"></div>
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
