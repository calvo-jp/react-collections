import StarIcon from '@heroicons/react/solid/StarIcon';

const Summary = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-500 to-orange-400 p-4 py-3 shadow-md w-fit">
      <div className="text-white w-[125px] flex flex-col items-center">
        <div className="text-sm">Average Rating</div>

        <div className="flex mt-1">
          <StarIcon className="w-6 h-6" />
          <StarIcon className="w-6 h-6 opacity-40" />
          <StarIcon className="w-6 h-6 opacity-40" />
          <StarIcon className="w-6 h-6 opacity-40" />
          <StarIcon className="w-6 h-6 opacity-40" />
        </div>
      </div>
    </div>
  );
};

export default Summary;
