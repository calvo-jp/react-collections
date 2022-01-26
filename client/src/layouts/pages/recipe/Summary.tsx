import HeartIcon from '@heroicons/react/solid/HeartIcon';
import StarIcon from '@heroicons/react/solid/StarIcon';

const Summary = () => {
  return (
    <div className="flex gap-3">
      <div className="bg-gradient-to-r from-orange-400 to-yellow-500 p-4 py-3 shadow-md w-[200px] text-white flex items-center gap-2">
        <StarIcon className="w-16 h-16" />

        <div>
          <div className="text-sm">Average Rate</div>
          <div className="text-2xl">4</div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-400 to-pink-400 p-4 py-3 shadow-md w-[200px] text-white flex items-center gap-2">
        <HeartIcon className="w-16 h-16" />

        <div>
          <div className="text-sm">Total hearts</div>
          <div className="text-2xl">1</div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
