import BookOpenIcon from '@heroicons/react/outline/BookOpenIcon';
import ClipboardListIcon from '@heroicons/react/outline/ClipboardListIcon';
import CogIcon from '@heroicons/react/outline/CogIcon';
import HeartIcon from '@heroicons/react/outline/HeartIcon';
import PencilAltIcon from '@heroicons/react/outline/PencilAltIcon';
import StarIcon from '@heroicons/react/solid/StarIcon';
import recipes from 'assets/json/recipes.json';
import reviews from 'assets/json/reviews.json';
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
import Button from 'widgets/Button';
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

const Recipe: NextPage<IRecipe> = (data) => {
  const { query, isFallback, ...router } = useRouter();

  const getCurrentTab = React.useMemo(() => {
    return function () {
      const tab = [query.tab].flat().at(0) || TABS[0];
      return TABS.find((tab_) => tab_ === tab);
    };
  }, [query]);

  const [currentTab, setCurrentTab] = React.useState(getCurrentTab());

  const handleChange = (value: typeof TABS[number]) => {
    router.push(`/recipes/${query.id}?tab=${value}`);
  };

  React.useEffect(() => {
    setCurrentTab(getCurrentTab());
    return () => setCurrentTab(TABS[0]);
  }, [getCurrentTab]);

  // next building page
  if (isFallback) return <Loader />;

  // invalid tab
  if (!currentTab) return <NotFound />;

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

        <Jumbotron src={data.avatar} />

        <main className="p-8">
          <div className="max-w-[900px] mx-auto">
            <section>
              <div>
                <div className="flex justify-between w-full items-start">
                  <div className="flex items-center gap-2">
                    <div>
                      <h2 className="text-2xl">{data.name}</h2>

                      <small className="text-gray-500 flex items-center gap-1">
                        <time>
                          {formatDistanceToNow(new Date(data.createdAt), {
                            includeSeconds: true,
                            addSuffix: true,
                          })}
                        </time>
                        <div>by</div>
                        <Link href="/users/1" passHref>
                          <a className="hover:text-blue-500 hover:font-semibold">
                            {data.author.name}
                          </a>
                        </Link>
                      </small>
                    </div>
                  </div>

                  <AddToFav />
                </div>

                <p className="mt-4">{data.description}</p>
              </div>
            </section>

            <section className="mt-4">
              <Tags items={data.tags} />
            </section>

            <section className="mt-8 flex gap-3">
              <Summary />
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

//
// *---------------------*
// |   ACTION BUTTONS    |
// *---------------------*
//

const AddToFav = () => {
  const handleClick = () => {};

  return (
    <button
      className="flex text-sm items-center gap-2 border p-2 px-3 border-red-300 text-red-400 rounded-md hover:border-red-400 hover:ring-4 hover:ring-red-100"
      onClick={handleClick}
    >
      <HeartIcon className="w-4 h-4" />
      <span>Add to favs</span>
    </button>
  );
};

//
// *-------------*
// |   LOADER    |
// *-------------*
//

const Loader = () => {
  return (
    <div className="p-4">
      <p>Loading...</p>
    </div>
  );
};

//
// *---------------*
// |   SETTINGS    |
// *---------------*
//

const Settings = () => {
  return <div></div>;
};

//
// *--------------*
// |   REVIEWS    |
// *--------------*
//

const Reviews = ({ items }: Itemable<IReview>) => {
  return (
    <div>
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <Review {...item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

const Review = (props: IReview) => {
  const { body, rate, author, createdAt } = props;

  return (
    <div>
      <Rating value={rate} readonly />

      <p>{body}</p>

      <small className="text-gray-500 flex gap-1">
        <time>
          {formatDistanceToNow(new Date(createdAt), {
            addSuffix: true,
            includeSeconds: true,
          })}
        </time>
        <span>by</span>

        {author && (
          <Link passHref href={'/users/' + author.id}>
            <a className="hover:text-blue-500 hover:font-semibold">
              {author.name}
            </a>
          </Link>
        )}
      </small>
    </div>
  );
};

//
// *-------------------*
// |   INSTRUCTIONS    |
// *-------------------*
//

const Instructions = () => {
  return <div></div>;
};

//
// *------------------*
// |   INGREDIENTS    |
// *------------------*
//

const Ingredients = (props: Itemable<string>) => {
  return (
    <ul className="list-disc pl-4">
      {props.items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};

//
// *--------------*
// |   SUMMARY    |
// *--------------*
//

const Summary = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-500 to-orange-400 p-4 py-3 shadow-md w-fit">
      <div className="text-white w-[125px] flex flex-col items-center">
        <div className="text-sm">Average Rating</div>

        <div className="flex mt-1">
          <StarIcon className="w-6 h-6" />
          <StarIcon className="w-6 h-6 opacity-40" />
          <StarIcon className="w-6 h-6 opacity-40" />
          <StarIcon className="w-6 h-6 opacity-40" />
          <StarIcon className="w-6 h-6 opacity-40" />
        </div>
      </div>
    </div>
  );
};

//
// *------------------*
// |   TAB CONTENT    |
// *------------------*
//

interface TabContentProps {
  data: IRecipe;
  /** which tab is active */
  currentView: TabQuery;
}

const TabContent = ({ currentView, data }: TabContentProps) => {
  switch (currentView) {
    case TAB4:
      return <Settings />;
    case TAB3:
      return <Reviews items={reviews} />;
    case TAB2:
      return <Instructions />;
    default:
      return <Ingredients items={data.ingredients} />;
  }
};

//
// *----------*
// |   TABS   |
// *----------*
//

interface TabsProps {
  value: TabQuery;
  onChange?: (value: TabQuery) => void;
}

const Tabs = ({ value, onChange }: TabsProps) => {
  const handleClick = (newValue: TabQuery) => {
    return function () {
      if (onChange) onChange(newValue);
    };
  };

  const items: [TabQuery, SVGIcon][] = [
    [TAB1, ClipboardListIcon],
    [TAB2, BookOpenIcon],
    [TAB3, PencilAltIcon],
    [TAB4, CogIcon],
  ];

  return (
    <nav>
      <ul className="flex flex-wrap gap-x-4 gap-y-2">
        {items.map(([tabValue, SVGIcon]) => (
          <li key={tabValue}>
            <Tab
              icon={<SVGIcon className="w-4 h-4" />}
              value={capitalize(tabValue)}
              active={tabValue === value}
              onClick={handleClick(tabValue)}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

interface TabProps {
  icon: JSX.Element;
  value: string;
  active?: boolean;
}

const Tab: React.FC<TabProps & React.ComponentProps<'button'>> = ({
  icon,
  value,
  active,
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(
        'flex items-center gap-1',
        active && 'text-blue-600',
        className
      )}
      {...props}
    >
      <span>{icon}</span>
      <span>{value}</span>
    </button>
  );
};

//
// *-----------*
// |   TAGS    |
// *-----------*
//

const Tags = (props: Itemable<string>) => {
  return (
    <ul className="flex flex-wrap gap-1">
      {props.items.map((item) => (
        <Tag key={item} value={item} />
      ))}
    </ul>
  );
};

function Tag(props: Record<'value', string>) {
  return <li className="text-sm p-2 bg-blue-100">{props.value}</li>;
}

//
// *----------------*
// |   JUMBOTRON    |
// *----------------*
//

const Jumbotron = (props: Record<'src', string>) => {
  return (
    <figure className="relative h-[300px]">
      <Image
        src={props.src}
        alt=""
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
    </figure>
  );
};

//
// *----------------*
// |   CONSTANTS    |
// *----------------*
//

const TAB1 = 'ingredients';
const TAB2 = 'instructions';
const TAB3 = 'reviews';
const TAB4 = 'settings';

// prettier-ignore
type TabsTuple = [
  typeof TAB1, 
  typeof TAB2, 
  typeof TAB3, 
  typeof TAB4
];

// prettier-ignore
const TABS: TabsTuple = [
  TAB1,
  TAB2,
  TAB3,
  TAB4,
];

//
// *-------------------*
// |   SHARED TYPES    |
// *-------------------*
//

type TabQuery = TabsTuple[number];
type SVGIcon = (props: React.ComponentProps<'svg'>) => JSX.Element;
type Itemable<T = unknown> = Record<'items', T[]>;

export default Recipe;
