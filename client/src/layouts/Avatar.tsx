import CameraIcon from '@heroicons/react/solid/CameraIcon';
import Image from 'next/image';

interface AvatarProps {
  src: string | StaticImageData;

  // TODO: add onchange whenever a user uploads new pp
}

const Avatar = (props: AvatarProps) => {
  return (
    <div className="w-[200px] h-[200px] basis-[200px] shrink-0 grow-0 relative">
      <div className="border-4 border-gray-100 relative w-full h-full rounded-full overflow-hidden">
        <Image
          src={props.src}
          alt=""
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>

      <button className="flex items-center justify-center z-10 absolute right-1 bottom-1 bg-gradient-to-r from-blue-500 h-12 w-12 to-blue-400 rounded-full border-4 border-gray-100 group">
        <CameraIcon className="fill-white w-7 h-7 group-hover:w-8 group-hover:h-8 transition-all duration-100" />
      </button>
    </div>
  );
};

export default Avatar;
