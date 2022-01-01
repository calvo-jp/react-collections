import Link from 'next/link';

const Brand = () => {
  return (
    <Link href="/" passHref>
      <a className="text-xl">Recipe</a>
    </Link>
  );
};

export default Brand;
