import avatar from 'assets/images/avatar.jpg';
import recipes from 'assets/json/recipes.json';
import clsx from 'clsx';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import HeaderTwo from 'layouts/HeaderTwo';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NotFound from 'pages/404';
import * as React from 'react';
import IRecipe from 'types/recipe';
import IReview from 'types/review';
import capitalize from 'utils/capitalize';
import Rating from 'widgets/Rating';

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

// prettier-ignore
const tabs = [
  'ingredients', 
  'instructions', 
  'reviews'
];

const Recipe: NextPage<IRecipe> = (data) => {
  const router = useRouter();
  const params = router.query as Params;

  const getCurrentTab = React.useMemo(() => {
    return function (): string {
      return [params.tab].flat().at(0)?.trim().toLowerCase() || tabs[0];
    };
  }, [params.tab]);

  const [currentTab, setCurrentTab] = React.useState(getCurrentTab());

  const handleChange = (value: string) => {
    router.push(`/recipes/${params.id}?tab=${value}`);
  };

  React.useEffect(() => {
    setCurrentTab(getCurrentTab());

    return () => setCurrentTab(tabs[0]);
  }, [getCurrentTab]);

  // fetching
  if (router.isFallback) return <Loader />;

  // unknown tab
  if (!tabs.includes(currentTab)) return <NotFound />;

  return (
    <React.Fragment>
      <Head>
        <title>{data.name}</title>
        <meta property="og:title" content={data.name} key="OG.TITLE" />
        <meta
          property="og:description"
          content={data.description}
          key="OG.DESCRIPTION"
        />
      </Head>

      <div>
        <HeaderTwo url="/recipes" label="Recipes" />

        <Jumbotron src={data.cover} />

        <main className="p-8">
          <div className="max-w-[900px] mx-auto">
            <section>
              <div>
                <div className="flex justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <h1 className="text-2xl">{data.name}</h1>

                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <div>
                          {formatDistanceToNow(new Date(data.createdAt))}
                        </div>
                        <div>by</div>
                        <Link href="/users/1" passHref>
                          <a className="hover:text-blue-500 hover:font-semibold">
                            {data.author.name}
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="mt-4">{data.description}</p>
              </div>
            </section>

            <section className="mt-4">
              <Tags items={data.tags} />
            </section>

            <section className="mt-8">
              <Tabs value={currentTab} onChange={handleChange} />
            </section>

            <section className="mt-4">
              <TabContent currentView={currentTab} data={data} />
            </section>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
};

const Loader = () => {
  return (
    <div className="p-4">
      <p>Loading...</p>
    </div>
  );
};

interface TabContentProps {
  data: IRecipe;
  /** which tab is active */
  currentView: string;
}

const TabContent = ({ currentView, data }: TabContentProps) => {
  switch (currentView) {
    case 'reviews':
      return <Reviews />;
    case 'instructions':
      return <Instructions />;
    default:
      return <Ingredients items={data.ingredients} />;
  }
};

const Reviews = () => {
  return (
    <div className="flex flex-col gap-4">
      <Review rate={5} body="Great job!" />
      <Review rate={4} body="You're awesome" />
    </div>
  );
};

const Review = ({ body, rate }: Pick<IReview, 'rate' | 'body'>) => {
  return (
    <div>
      <Rating value={rate} />
      <p>{body}</p>
      <div className="text-sm text-gray-500">3 mins ago by JP Calvo</div>
    </div>
  );
};

const Instructions = () => {
  return <div></div>;
};

interface IngredientsProps {
  items: string[];
}

const Ingredients = ({ items }: IngredientsProps) => {
  return (
    <ul className="list-disc pl-4">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};

interface TabsProps {
  value?: string;
  onChange?: (value: string) => void;
}

const Tabs = ({ value, onChange }: TabsProps) => {
  const handleClick = (newValue: string) => {
    return function () {
      if (onChange) onChange(newValue);
    };
  };

  return (
    <nav>
      <ul className="flex flex-wrap gap-x-4 gap-y-2">
        {tabs.map((tab) => (
          <li key={tab}>
            <Tab onClick={handleClick(tab)} active={value === tab}>
              {capitalize(tab)}
            </Tab>
          </li>
        ))}
      </ul>
    </nav>
  );
};

interface TabProps {
  active?: boolean;
}

const Tab: React.FC<TabProps & React.ComponentProps<'button'>> = ({
  active,
  className,
  children,
  ...props
}) => {
  return (
    <button className={clsx(active && 'font-bold', className)} {...props}>
      {children}
    </button>
  );
};

interface TagsProps {
  items: string[];
}

const Tags: React.FC<TagsProps> = ({ items }) => {
  return (
    <ul className="flex flex-wrap gap-1">
      {items.map((item) => (
        <Tag key={item} value={item} />
      ))}
    </ul>
  );
};

interface TagProps {
  value: string;
}

const Tag = (props: TagProps) => {
  return <li className="text-sm p-2 bg-sky-200">{props.value}</li>;
};

interface JumbotronProps {
  src: string;
}

const Jumbotron = (props: JumbotronProps) => {
  return (
    <div className="relative h-[300px]">
      <Image
        src={props.src}
        alt=""
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
    </div>
  );
};

export default Recipe;
