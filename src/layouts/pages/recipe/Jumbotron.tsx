import CameraIcon from '@heroicons/react/outline/CameraIcon';
import Image from 'next/image';

interface JumbotronProps {
  src: string;
}

const Jumbotron = (props: JumbotronProps) => {
  return (
    <figure className="relative h-[250px] sm-[300px] md:h-[350px] lg:h-[400px] shadow-md dark:bg-zinc-800">
      <Image
        src={props.src}
        alt=""
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />

      <button className="bg-white p-2 absolute bottom-6 right-6 rounded-full shadow-md dark:bg-zinc-900 opacity-90 hover:opacity-100">
        <CameraIcon className="w-6 h-6 stroke-gray-500 dark:stroke-zinc-400" />
      </button>
    </figure>
  );
};

export default Jumbotron;
