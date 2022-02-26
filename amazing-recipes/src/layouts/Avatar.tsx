import CameraIcon from "@heroicons/react/solid/CameraIcon";
import Image from "next/image";

interface AvatarProps {
  src: string | StaticImageData;

  // TODO: add onchange whenever a user uploads new pp
}

const Avatar = (props: AvatarProps) => {
  return (
    <div className="relative h-[200px] w-[200px] shrink-0 grow-0 basis-[200px]">
      <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-gray-100 dark:border-zinc-800">
        <Image
          src={props.src}
          alt=""
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>

      <button className="group absolute right-1 bottom-1 z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 border-gray-100 bg-gradient-to-r from-blue-500 to-blue-400 dark:border-zinc-800 dark:from-sky-700 dark:to-sky-600">
        <CameraIcon className="h-7 w-7 fill-white transition-all duration-100 group-hover:h-8 group-hover:w-8" />
      </button>
    </div>
  );
};

export default Avatar;
