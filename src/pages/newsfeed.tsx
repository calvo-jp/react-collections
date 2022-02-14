import recipes from 'assets/samples/json/recipes.json';
import RecipeCard from 'layouts/cards/Recipe';
import Header from 'layouts/Header';
import Head from 'next/head';

const NewsFeed = () => {
  return (
    <div className="bg-gray-100 dark:bg-zinc-900 min-h-screen">
      <Head>
        <title>Newsfeed</title>
      </Head>

      <Header />

      <main className="p-8 grid grid-cols-3">
        <div className="col-span-2 grid grid-cols-2 gap-4">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} data={recipe} height={200} />
          ))}
        </div>
        <div></div>
      </main>
    </div>
  );
};

export default NewsFeed;
