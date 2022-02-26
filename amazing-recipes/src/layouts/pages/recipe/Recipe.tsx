import BookOpenIcon from "@heroicons/react/outline/BookOpenIcon";
import ChartPieIcon from "@heroicons/react/outline/ChartPieIcon";
import ClipboardListIcon from "@heroicons/react/outline/ClipboardListIcon";
import CogIcon from "@heroicons/react/outline/CogIcon";
import PencilAltIcon from "@heroicons/react/outline/PencilAltIcon";
import reviews from "assets/samples/json/reviews.json";
import clsx from "clsx";
import HeaderTwo from "layouts/HeaderTwo";
import Head from "next/head";
import * as React from "react";
import type IRecipe from "types/recipe";
import capitalize from "utils/capitalize";
import Article from "./Article";
import Ingredients from "./Ingredients";
import Instructions from "./Instructions";
import Jumbotron from "./Jumbotron";
import Reviews from "./Reviews";
import Settings from "./Settings";
import Summary from "./Summary";
import Tags from "./Tags";

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
        <HeaderTwo />

        <div className="mx-auto max-w-screen-md md:px-4">
          <Jumbotron src={data.avatar!} />

          <main className="p-4 md:px-0">
            <div className="">
              <section>
                <Article {...data} />
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
      </div>
    </React.Fragment>
  );
};

interface TabsProps {
  value?: TabValue;
  onChange?: (value: TabValue) => void;
}

type SVGIcon = (props: React.ComponentProps<"svg">) => JSX.Element;

const Tabs = (props: TabsProps) => {
  const { value, onChange } = props;

  const handleClick = (newValue: TabValue) => {
    return function () {
      if (onChange) onChange(newValue);
    };
  };

  const items: [TabValue, SVGIcon][] = [
    ["summary", ChartPieIcon],
    ["ingredients", ClipboardListIcon],
    ["instructions", BookOpenIcon],
    ["reviews", PencilAltIcon],
    ["settings", CogIcon],
  ];

  return (
    <nav>
      <ul className="flex flex-wrap gap-x-4 gap-y-2">
        {items.map(([tabValue, SVGIcon]) => (
          <li key={tabValue} title={tabValue}>
            <Tab
              icon={<SVGIcon className="h-6 w-6 sm:w-4 md:h-4" />}
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

const Tab: React.FC<TabProps & React.ComponentProps<"button">> = ({
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
        "flex items-center gap-1",
        active && "text-blue-600 dark:text-sky-500",
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
    case "summary":
      return <Summary />;
    case "settings":
      return <Settings />;
    case "reviews":
      return <Reviews items={reviews} />;
    case "instructions":
      return <Instructions items={data.instructions} />;
    default:
      return <Ingredients items={data.ingredients} />;
  }
};

export default Recipe;
