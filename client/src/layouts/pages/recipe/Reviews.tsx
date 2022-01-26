import HeartIcon from '@heroicons/react/outline/HeartIcon';
import ChevronLeftIcon from '@heroicons/react/solid/ChevronLeftIcon';
import ChevronRightIcon from '@heroicons/react/solid/ChevronRightIcon';
import IReview from 'types/review';
import Review from './Review';

interface ReviewsProps {
  items: IReview[];
}

const Reviews = (props: ReviewsProps) => {
  return (
    <div className="flex flex-col gap-4">
      {props.items.map((item) => (
        <Review {...item} key={item.id} />
      ))}

      <div className="flex gap-4">
        <Pagination />

        <button className="flex items-center gap-1 text-blue-600">
          <HeartIcon className="w-4 h-4" />
          <span className="text-sm">Post a feedback</span>
        </button>
      </div>
    </div>
  );
};

const Pagination = () => {
  return (
    <div className="flex items-center text-sm gap-1">
      <button>
        <ChevronLeftIcon className="w-4 h-4" />
      </button>
      <span>Page 1 of 4</span>
      <button>
        <ChevronRightIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Reviews;
