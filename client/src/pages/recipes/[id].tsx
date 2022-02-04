import recipes from 'assets/samples/json/recipes.json';
import useQuery from 'hooks/useQuery';
import Recipe from 'layouts/pages/recipe';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import NotFound from 'pages/404';
import * as React from 'react';
import type IRecipe from 'types/recipe';

interface Params {
  id: string;
  [key: string]: any;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = recipes.map((item) => ({ params: { id: item.id.toString() } }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<IRecipe, Params> = async ({
  params,
}) => {
  const item = recipes.find(({ id }) => id.toString() === params!.id);

  if (!item) {
    return {
      notFound: true,
    };
  }

  return {
    props: item,
    revalidate: 60 * 60 * 24,
  };
};

const RecipePage: NextPage<IRecipe> = (props) => {
  const { isFallback, ...router } = useRouter();

  const query = useQuery('id', 'tab', 'redirect');

  const getCurrentTab = React.useMemo(() => {
    return function () {
      const tab = query.get('tab')?.toLowerCase() || Tabs[0];

      if (isValidTab(tab)) return tab;
    };
  }, [query]);

  const [currentTab, setCurrentTab] = React.useState(getCurrentTab());

  const handleChange = (value: string) => {
    let redirect: string;

    redirect = query.get('redirect') || '/recipes';
    redirect = encodeURIComponent(redirect);

    const id = query.get('id')!;
    const url = `/recipes/${id}?redirect=${redirect}&tab=${value}`;

    router.push(url, undefined, { scroll: false });
  };

  React.useEffect(() => {
    setCurrentTab(getCurrentTab());
    return () => setCurrentTab(undefined);
  }, [getCurrentTab]);

  if (isFallback) return <Loader />;

  // invalid tab
  if (!currentTab) return <NotFound />;

  return <Recipe data={props} tab={currentTab} onTabChange={handleChange} />;
};

const Loader = () => {
  return (
    <div className="p-4">
      <p>Loading...</p>
    </div>
  );
};

// prettier-ignore
const Tabs = [
  'summary',
  'instructions',
  'ingredients',
  'settings',
  'reviews'
] as const;

type TabValue = typeof Tabs[number];

const isValidTab = (tab: any): tab is TabValue => Tabs.includes(tab);

export default RecipePage;
