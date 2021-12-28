import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import Rating from "widgets/Rating";

const Recipes = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Recipes</title>
      </Head>

      <div className="min-h-screen flex flex-col bg-gray-100">
        <Header />

        <main className="flex-grow">
          <div className="flex">
            <section className="p-8 flex flex-col gap-8">
              <div className="w-[200px] h-[200px] relative">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="/images/pp.jpg"
                    alt=""
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                  />
                </div>

                <button className="z-10 absolute right-1 bottom-1 bg-gradient-to-r from-cyan-500 to-blue-300 rounded-full p-1 border-4 border-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 fill-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <button className="w-full bg-blue-500 p-2 text-white text-md rounded-md flex items-center justify-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                  <path
                    fillRule="evenodd"
                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Create New</span>
              </button>

              <Navbar />

              <ul className="flex flex-wrap gap-1 items-center text-sm max-w-[200px]">
                <li>
                  <a href="#">About</a>
                </li>
                <li className="w-1 h-1 bg-gray-300 rounded-full" />
                <li>
                  <a href="#">Cookies and Terms</a>
                </li>
                <li className="w-1 h-1 bg-gray-300 rounded-full" />
                <li>
                  <a href="#">Contact us</a>
                </li>
                <li className="w-1 h-1 bg-gray-300 rounded-full" />
                <li>
                  <a href="#">Help</a>
                </li>
              </ul>
            </section>

            <section className="p-8 w-full">
              <main className="grid gap-6 grid-cols-1 lg:grid-cols-2 grid-flow-row-dense">
                {recipes.map(({ image, name, description, averageRating }) => (
                  <article className="bg-white shadow-md" key={name}>
                    <div className="w-full h-[250px] relative overflow-hidden">
                      <Image
                        src={image}
                        alt=""
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                      />
                    </div>

                    <div className="p-4">
                      <h4 className="text-xl">{name}</h4>
                      <p className="text-sm text-gray-700 truncate">
                        {description}
                      </p>
                      <div className="mt-2">
                        <Rating value={averageRating} />
                      </div>
                    </div>
                  </article>
                ))}
              </main>
            </section>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
};

const Hamburger = () => {
  return (
    <button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  );
};

const Brand = () => {
  return (
    <Link href="/" passHref>
      <a className="text-xl">Recipe</a>
    </Link>
  );
};

const Searchbar = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="p-2 border border-gray-200 bg-white flex items-center w-[350px] gap-2 rounded-md overflow-hidden">
        <div className="flex-grow">
          <input
            type="search"
            name=""
            id=""
            placeholder="Search"
            className="outline-none w-full"
          />
        </div>

        <div className="h-4 my-auto border-l border-gray-200" />

        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mx-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <header className="bg-white shadow-md z-10">
      <div className="flex justify-between items-center gap-4 py-2 px-8">
        <div className="flex items-center gap-2">
          <Hamburger />
          <Brand />
        </div>

        <div className="flex items-center gap-4">
          <Searchbar />

          <div className="flex gap-2">
            <Link href="" passHref>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 fill-slate-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

const Navbar = () => {
  return (
    <nav>
      <ul className="text-lg">
        <li>
          <a href="#" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg>

            <span>Dashboard</span>
          </a>
        </li>

        <li>
          <a href="#" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                clipRule="evenodd"
              />
            </svg>
            <span>Recipes</span>
          </a>
        </li>

        <li>
          <a href="#" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            <span>Favorites</span>
          </a>
        </li>

        <li>
          <a href="#" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
            <span>Settings</span>
          </a>
        </li>

        <li>
          <a href="#" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                clipRule="evenodd"
              />
            </svg>
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

const recipes = [
  {
    name: "Adobong manok",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit." +
      "Earum, in, illo, molestiae accusantium natus recusandae vel nihil " +
      "blanditiis labore minus ut explicabo non architecto eum?",
    image: "/images/3.jpg",
  },
  {
    name: "Tinolang bangus",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit",
    image: "/images/4.jpg",
    averageRating: 5,
  },
  {
    name: "Sinanlag nga bugas",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit," +
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit",
    image: "/images/4.jpg",
    averageRating: 5,
  },
];

export default Recipes;
