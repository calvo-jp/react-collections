import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Link from 'next/link';
import IReview from 'types/review';
import Rating from 'widgets/Rating';

const Review = (props: IReview) => {
  const { body, rate, author, createdAt } = props;

  return (
    <div>
      <Rating value={rate} readonly />

      <p>{body}</p>

      <small className="text-gray-500 flex gap-1 dark:text-zinc-400">
        <time>
          {formatDistanceToNow(new Date(createdAt), {
            addSuffix: true,
            includeSeconds: true,
          })}
        </time>
        <span>by</span>

        {author && (
          <Link passHref href={'/users/' + author.id}>
            <a className="hover:text-blue-500 dark:hover:text-sky-400">
              {author.name}
            </a>
          </Link>
        )}
      </small>
    </div>
  );
};

export default Review;
