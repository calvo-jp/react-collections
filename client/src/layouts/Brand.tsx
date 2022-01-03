import Link from 'next/link';

/** aka logo */
const Brand = () => {
  return (
    <Link href="/" passHref>
      <a className="text-xl">Recipe</a>
    </Link>
  );
};

export default Brand;
