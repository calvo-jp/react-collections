import BookmarkIcon from '@heroicons/react/outline/BookmarkIcon';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Link from 'next/link';
import IRecipe from 'types/recipe';

interface ArticleProps {
  data: IRecipe;
}

const Article = (props: ArticleProps) => {
  const { name, description, author } = props.data;

  const dateCreated = formatDistanceToNow(new Date(props.data.createdAt), {
    includeSeconds: true,
    addSuffix: true,
  });

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

            <small className="text-gray-500 flex items-center gap-1">
              <time>{dateCreated}</time>
              <div>by</div>
              <Link href="/users/1" passHref>
                <a className="hover:text-blue-500">{author.name}</a>
              </Link>
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
      <BookmarkIcon className="w-6 h-6 text-blue-500" />
    </button>
  );
};

export default Article;
