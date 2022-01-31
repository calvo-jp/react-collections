import {
  BookOpenIcon,
  ChartPieIcon,
  ClipboardListIcon,
  CogIcon,
  HeartIcon,
  PencilAltIcon,
} from '@heroicons/react/outline';
import HeartIconSolid from '@heroicons/react/solid/HeartIcon';
import reviews from 'assets/samples/json/reviews.json';
import clsx from 'clsx';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import HeaderTwo from 'layouts/HeaderTwo';
import Head from 'next/head';
import Link from 'next/link';
import * as React from 'react';
import type IRecipe from 'types/recipe';
import capitalize from 'utils/capitalize';
import Ingredients from './Ingredients';
import Instructions from './Instructions';
import Jumbotron from './Jumbotron';
import Reviews from './Reviews';
import Settings from './Settings';
import Summary from './Summary';
import Tags from './Tags';

// prettier-ignore
const TABS = [
  'summary',
  'ingredients',
  'instructions',
  'reviews',
  'settings',
] as const;

type TabValue = typeof TABS[number];

interface RecipeProps {
  data: IRecipe;
  tab?: TabValue;
  onTabChange?: (tab: TabValue) => void;
}

const Recipe = (props: RecipeProps) => {
  const { data, tab, onTabChange } = props;

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
        <HeaderTwo redirect="/recipes" label="Recipes" />

        <Jumbotron src={data.avatar!} />

        <main className="p-4 md:p-6 lg:p-8">
          <div className="max-w-[900px] mx-auto">
            <section>
              <div>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div>
                      <h2
                        className="text-2xl focus:outline-dotted focus:outline-1"
                        contentEditable
                        suppressContentEditableWarning
                        spellCheck={false}
                      >
                        {data.name}
                      </h2>

                      <small className="text-gray-500 flex items-center gap-1">
                        <time>
                          {formatDistanceToNow(new Date(data.createdAt), {
                            includeSeconds: true,
                            addSuffix: true,
                          })}
                        </time>
                        <div>by</div>
                        <Link href="/users/1" passHref>
                          <a className="hover:text-blue-500">
                            {data.author.name}
                          </a>
                        </Link>
                      </small>
                    </div>
                  </div>

                  <div>
                    <HeartButton />
                  </div>
                </div>

                <p
                  className="mt-4 focus:outline-dotted focus:outline-1"
                  contentEditable
                  suppressContentEditableWarning
                  spellCheck={false}
                >
                  {data.description}
                </p>
              </div>
            </section>

            <section className="mt-4">
              <Tags items={data.tags} />
            </section>

            <section className="mt-8">
              <Tabs value={tab} onChange={onTabChange} />
            </section>

            <section className="mt-4">
              <TabContent selectedTab={tab} data={data} />
            </section>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
};

interface HeartButtonProps {
  active?: boolean;
  onToggle?: (value: boolean) => void;
}

const HeartButton = (props: HeartButtonProps) => {
  const { active, onToggle } = props;

  const handleClick = () => {
    if (onToggle) onToggle(!active);
  };

  return (
    <button onClick={handleClick}>
      {active && <HeartIconSolid className="w-6 h-6 fill-red-400" />}
      {!active && <HeartIcon className="w-6 h-6 text-red-300" />}
    </button>
  );
};

interface TabsProps {
  value?: TabValue;
  onChange?: (value: TabValue) => void;
}

type SVGIcon = (props: React.ComponentProps<'svg'>) => JSX.Element;

const Tabs = (props: TabsProps) => {
  const { value, onChange } = props;

  const handleClick = (newValue: TabValue) => {
    return function () {
      if (onChange) onChange(newValue);
    };
  };

  const items: [TabValue, SVGIcon][] = [
    ['summary', ChartPieIcon],
    ['ingredients', ClipboardListIcon],
    ['instructions', BookOpenIcon],
    ['reviews', PencilAltIcon],
    ['settings', CogIcon],
  ];

  return (
    <nav>
      <ul className="flex flex-wrap gap-x-4 gap-y-2">
        {items.map(([tabValue, SVGIcon]) => (
          <li key={tabValue} title={tabValue}>
            <Tab
              icon={<SVGIcon className="w-6 h-6 sm:w-4 md:h-4" />}
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
      <span className="hidden sm:block">{value}</span>
    </button>
  );
};

interface TabContentProps {
  data: IRecipe;
  selectedTab?: TabValue;
}

const TabContent = (props: TabContentProps) => {
  const { selectedTab, data } = props;

  switch (selectedTab) {
    case 'summary':
      return <Summary />;
    case 'settings':
      return <Settings />;
    case 'reviews':
      return <Reviews items={reviews} />;
    case 'instructions':
      return <Instructions items={data.instructions} />;
    default:
      return <Ingredients items={data.ingredients} />;
  }
};

export default Recipe;
