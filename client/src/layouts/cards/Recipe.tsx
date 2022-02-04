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
      <a className="block bg-white shadow-md md:hover:ring-4 md:hover:ring-blue-200">
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

          <p className="text-sm text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis">
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
