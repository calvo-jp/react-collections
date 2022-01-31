import logo from 'assets/logo.svg';
import Image from 'next/image';
import Link from 'next/link';

interface BrandProps {
  redirect?: string;
}

const Brand = (props: BrandProps) => {
  const redirect = props.redirect || '/';

  return (
    <Link href={redirect} passHref>
      <a className="flex h-fit">
        <Image src={logo} alt="logo" />
      </a>
    </Link>
  );
};

export default Brand;
