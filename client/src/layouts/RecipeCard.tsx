import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import IRecipe from 'types/recipe';
import Rating from 'widgets/Rating';

type StringOrNumber = string | number;

interface RecipeCardProps {
  data: IRecipe;
  width?: StringOrNumber;
}

const RecipeCard = ({ data, width }: RecipeCardProps) => {
  // prettier-ignore
  const {
    id,
    name,
    image,
    rating,
    description
  } = data

  return (
    <Link href={'/recipes/'.concat(id.toString())} passHref>
      <a
        key={name}
        className={clsx(
          'bg-white shadow-md group hover:ring-4 hover:ring-blue-200',
          width && 'w-' + width
        )}
      >
        <figure className="w-full h-[250px] relative overflow-hidden">
          <div className="absolute w-full h-full z-20 top-0 left-0 bg-black bg-opacity-50 hidden group-hover:flex items-center justify-center" />

          <Image
            src={image}
            alt=""
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </figure>

        <article className="p-4">
          <h4 className="text-xl">{name}</h4>
          <p className="text-sm text-gray-700 truncate">{description}</p>

          <div className="mt-2">
            <Rating value={rating} />
          </div>
        </article>
      </a>
    </Link>
  );
};

export default RecipeCard;
