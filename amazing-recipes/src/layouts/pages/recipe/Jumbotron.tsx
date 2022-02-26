import CameraIcon from "@heroicons/react/outline/CameraIcon";
import Image from "next/image";

interface JumbotronProps {
  src: string;
}

const Jumbotron = (props: JumbotronProps) => {
  return (
    <figure className="sm-[300px] relative h-[250px] shadow-md dark:bg-zinc-800 md:h-[350px] lg:h-[400px]">
      <Image
        src={props.src}
        alt=""
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />

      <button className="absolute bottom-6 right-6 rounded-full bg-white p-2 opacity-90 shadow-md hover:opacity-100 dark:bg-zinc-900">
        <CameraIcon className="h-6 w-6 stroke-gray-500 dark:stroke-zinc-400" />
      </button>
    </figure>
  );
};

export default Jumbotron;
