import logo from 'assets/logo.svg';
import Image from 'next/image';
import Link from 'next/link';

const Brand = () => {
  return (
    <Link href="/" passHref>
      <a className="flex h-fit">
        <Image src={logo} alt="logo" />
      </a>
    </Link>
  );
};

export default Brand;
