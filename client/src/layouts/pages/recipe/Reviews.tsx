import IReview from 'types/review';
import Review from './Review';

interface ReviewsProps {
  items: IReview[];
}

const Reviews = ({ items }: ReviewsProps) => {
  return (
    <div>
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <Review {...item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
