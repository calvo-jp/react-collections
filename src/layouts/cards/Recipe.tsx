import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import IRecipe from 'types/recipe';
import Rating from 'widgets/Rating';

interface RecipeCardProps {
  data: IRecipe;
  width?: number;
  height?: number;
}

const RecipeCard = (props: RecipeCardProps) => {
  const router = useRouter();

  const {
    data: { id, name, description, banner, summary },
    width,
    height,
  } = props;

  return (
    <Link
      href={`/recipes/${id}?redirect=${encodeURIComponent(router.pathname)}`}
      passHref
    >
      <a className="block bg-white shadow-md md:hover:ring-4 md:hover:ring-blue-200 dark:bg-zinc-800 dark:md:hover:ring-0 dark:border dark:border-zinc-700 dark:shadow-none">
        <figure
          className="relative"
          style={{
            width,
            height,
          }}
        >
          <Image
            src={banner!}
            alt=""
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </figure>

        <article className="p-4">
          <h4 className="text-lg">{name}</h4>

          <p className="text-sm text-gray-700 line-clamp-1 dark:text-slate-400">
            {description}
          </p>

          <div className="mt-2">
            <Rating value={summary.rating} />
          </div>
        </article>
      </a>
    </Link>
  );
};

export default RecipeCard;
