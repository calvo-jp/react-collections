import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import onScrollReveal from "utils/onScrollReveal";
import ChevronLeftIcon from "widgets/icons/ChevronLeft";

const Recipe = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Adobong Manok</title>
      </Head>

      <div>
        <Header />

        <Jumbotron />

        <main className="p-8">
          <div className="max-w-[900px] mx-auto">
            <section>
              <article>
                <h1 className="text-2xl">Adobong Manok</h1>

                <p className="text-sm text-gray-500">
                  <span>3 mins ago by</span>

                  <Link href="/users/1" passHref>
                    <a className="ml-1 hover:text-blue-500">calvojp</a>
                  </Link>
                </p>

                <p className="mt-4">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Culpa nulla nobis inventore eum ratione esse maiores! Sint non
                  itaque doloribus!
                </p>
              </article>
            </section>

            <section className="mt-4">
              <Tags
                items={[
                  "Adobo",
                  "Manamit",
                  "BrownKaayo",
                  "AriPagd",
                  "COVID19",
                  "HappyNewYear2022",
                ]}
              />
            </section>

            <section className="mt-8">
              <Navbar />
            </section>

            <section className="mt-4">
              <Ingredients
                items={[
                  "16kg chicken",
                  "1kg tomatoes",
                  "3pcs datu-puti",
                  "1mg baby oil para solid",
                  "bawang at sibuyas",
                ]}
              />
            </section>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
};

interface IngredientsProps {
  items: string[];
}

const Ingredients: React.FC<IngredientsProps> = ({ items }) => {
  return (
    <ul className="list-disc pl-4">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};

const Navbar = () => {
  return (
    <nav>
      <ul className="flex flex-wrap gap-x-4 gap-y-2">
        <li>
          <button>How to</button>
        </li>
        <li>
          <button className="font-bold">Ingredients</button>
        </li>
      </ul>
    </nav>
  );
};

interface TagsProps {
  items: string[];
}

const Tags: React.FC<TagsProps> = ({ items }) => {
  return (
    <ul className="flex flex-wrap gap-1">
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </ul>
  );
};

const Tag: React.FC = ({ children }) => {
  return <li className="text-sm p-2 bg-sky-200">{children}</li>;
};

const Jumbotron = () => {
  return (
    <div className="relative h-[300px]">
      <Image
        src="/images/8.jpg"
        alt=""
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
    </div>
  );
};

const Header = () => {
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (ref.current) onScrollReveal(ref.current);
  }, []);

  return (
    <header
      ref={ref}
      className="bg-white shadow-md z-10 sticky top-0 transition-all duration-300"
    >
      <div className="py-4 px-8">
        <Link href="/recipes" passHref>
          <a className="flex items-center gap-1">
            <ChevronLeftIcon />
            Go back
          </a>
        </Link>
      </div>
    </header>
  );
};

export default Recipe;
