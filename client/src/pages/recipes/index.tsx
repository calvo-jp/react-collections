import Image from "next/image";
import Link from "next/link";

const Recipes = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <div className="m-w-[1200px] mx-auto flex">
          <section className="px-14 py-12 flex flex-col gap-8">
            <div className="w-[200px] h-[200px] relative border-4 border-gray-100 rounded-full overflow-hidden">
              <Image
                src="/images/pp.jpg"
                alt=""
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </div>

            <nav>
              <ul>
                <li>
                  <a href="#" className="block text-lg font-light">
                    Dashboard
                  </a>
                </li>

                <li>
                  <a href="#" className="block text-lg font-light">
                    Recipes
                  </a>
                </li>
                <li>
                  <a href="#" className="block text-lg font-light">
                    Favorites
                  </a>
                </li>
                <li>
                  <a href="#" className="block text-lg font-light">
                    Settings
                  </a>
                </li>
                <li>
                  <a href="#" className="block text-lg font-light">
                    Logout
                  </a>
                </li>
              </ul>
            </nav>

            <ul className="flex flex-wrap gap-1 items-center text-xs max-w-[200px]">
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

          <section></section>
        </div>
      </main>
    </div>
  );
};

const Header = () => {
  return (
    <header className="bg-white z-10 border-b border-gray-100">
      <div className="flex justify-between items-center gap-4 py-2 px-8">
        <Link href="/" passHref>
          <a className="text-xl">Recipe</a>
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="p-2 border border-gray-200 bg-white flex items-center w-[350px] gap-2">
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

          <div className="flex gap-2">
            <a href="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 fill-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
              </svg>
            </a>

            <Link href="" passHref>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 fill-gray-400"
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

export default Recipes;
