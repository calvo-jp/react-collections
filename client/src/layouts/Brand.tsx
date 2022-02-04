import logo from 'assets/logo.svg';
import Image from 'next/image';
import Link from 'next/link';

interface BrandProps {
  redirectUrl?: string;
}

const Brand = ({ redirectUrl = '/' }: BrandProps) => {
  return (
    <Link href={redirectUrl} passHref>
      <a className="flex h-fit">
        <Image src={logo} alt="logo" />
      </a>
    </Link>
  );
};

export default Brand;
