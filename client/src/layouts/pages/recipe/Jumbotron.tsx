import Image from 'next/image';

interface JumbotronProps {
  src: string;
}

const Jumbotron = (props: JumbotronProps) => {
  return (
    <figure className="relative h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px]">
      <Image
        src={props.src}
        alt=""
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
    </figure>
  );
};

export default Jumbotron;
