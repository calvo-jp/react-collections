import XIcon from '@heroicons/react/outline/XIcon';
import recipes from 'assets/samples/json/recipes.json';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Layout from 'layouts/Layout';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import IRecipe from 'types/recipe';
import Rating from 'widgets/Rating';

const Bookmarks = () => {
  return (
    <Layout>
      <Head>
        <title>Favorites</title>
      </Head>

      <div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-4">
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
      <a className="p-4 flex items-center gap-4 shadow-md bg-white md:hover:ring-4 md:hover:ring-blue-200">
        <div className="relative h-[85px] basis-[85px] shrink-0 grow-0 rounded-full overflow-hidden">
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
          <p className="text-sm text-gray-600 line-clamp-1">{description}</p>

          <div className="mt-1">
            <Rating value={summary.rating} />
          </div>
        </div>

        <button>
          <XIcon className="w-6 h-6 text-gray-200" />
        </button>
      </a>
    </Link>
  );
};

export default Bookmarks;
