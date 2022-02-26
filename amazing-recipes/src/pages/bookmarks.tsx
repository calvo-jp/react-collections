import XIcon from "@heroicons/react/outline/XIcon";
import recipes from "assets/samples/json/recipes.json";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Layout from "layouts/Layout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import IRecipe from "types/recipe";
import Rating from "widgets/Rating";

const Bookmarks = () => {
  return (
    <Layout>
      <Head>
        <title>Favorites</title>
      </Head>

      <div>
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:gap-4 xl:grid-cols-3">
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <Bookmark {...recipe} />
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

const Bookmark = ({
  id,
  name,
  description,
  banner,
  summary,
  createdAt,
}: IRecipe) => {
  const router = useRouter();
  const path = router.asPath;

  const date = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
    includeSeconds: true,
  });

  return (
    <Link href={`/recipes/${id}?redirect=${encodeURIComponent(path)}`} passHref>
      <a className="flex items-center gap-4 bg-white p-4 shadow-md dark:bg-zinc-800 md:hover:ring-4 md:hover:ring-blue-200 dark:md:hover:ring-0 dark:md:hover:ring-sky-900">
        <div className="relative h-[85px] shrink-0 grow-0 basis-[85px] overflow-hidden rounded-full">
          <Image
            src={banner!}
            alt=""
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>

        <div className="grow">
          <div className="md:text-lg">{name}</div>
          <p className="text-sm text-gray-600 line-clamp-1 dark:text-zinc-400">
            {description}
          </p>

          <div className="mt-1">
            <Rating value={summary.rating} />
          </div>
        </div>

        <button>
          <XIcon className="h-6 w-6 stroke-gray-200 transition-colors duration-300 hover:stroke-gray-300 dark:stroke-zinc-700 dark:hover:stroke-zinc-600" />
        </button>
      </a>
    </Link>
  );
};

export default Bookmarks;
