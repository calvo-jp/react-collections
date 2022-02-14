import BookmarkIcon from '@heroicons/react/outline/BookmarkIcon';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Link from 'next/link';
import { useRouter } from 'next/router';
import IRecipe from 'types/recipe';

const Article = ({
  name,
  description,
  author,
  createdAt,
  updatedAt,
}: IRecipe) => {
  const router = useRouter();
  const pathname = router.asPath;
  const encodedPath = encodeURIComponent(pathname);

  const date = formatDistanceToNow(
    new Date(!!updatedAt ? updatedAt : createdAt),
    { includeSeconds: true, addSuffix: true }
  );

  return (
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
              {name}
            </h2>

            <small className="text-gray-500 dark:text-slate-400">
              Posted by&nbsp;
              <Link
                href={`/users/${author.id}?redirect=${encodedPath}`}
                passHref
              >
                <a className="hover:text-blue-500">{author.name}</a>
              </Link>
              &nbsp;
              {date}
            </small>
          </div>
        </div>

        <div>
          <Bookmark />
        </div>
      </div>

      <p
        className="mt-4 focus:outline-dotted focus:outline-1"
        contentEditable
        suppressContentEditableWarning
        spellCheck={false}
      >
        {description}
      </p>
    </div>
  );
};

interface BookmarkProps {}

const Bookmark = (props: BookmarkProps) => {
  return (
    <button className="">
      <BookmarkIcon className="w-6 h-6 text-blue-500 dark:text-sky-500" />
    </button>
  );
};

export default Article;
