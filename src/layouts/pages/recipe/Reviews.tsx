import HeartIcon from "@heroicons/react/outline/HeartIcon";
import ChevronLeftIcon from "@heroicons/react/solid/ChevronLeftIcon";
import ChevronRightIcon from "@heroicons/react/solid/ChevronRightIcon";
import IReview from "types/review";
import Review from "./Review";

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

        <button className="flex items-center gap-1 text-blue-600 dark:text-sky-500 dark:hover:text-sky-400">
          <HeartIcon className="h-4 w-4" />
          <span className="text-sm">Post a feedback</span>
        </button>
      </div>
    </div>
  );
};

const Pagination = () => {
  return (
    <div className="flex items-center gap-1 text-sm">
      <button>
        <ChevronLeftIcon className="h-4 w-4" />
      </button>
      <span>Page 1 of 4</span>
      <button>
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Reviews;
