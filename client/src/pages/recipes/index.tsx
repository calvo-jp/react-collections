import Header from "layouts/Header";
import Sidebar from "layouts/Sidebar";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import Rating from "widgets/Rating";

interface Item {
  id: number;
  name: string;
  description: string;
  averageRating?: number;
  image: string;
}

interface Props {
  items: Item[];
}

export const getStaticProps: GetStaticProps = async () => {
  const items = [
    {
      id: 1,
      name: "Adobong manok",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit." +
        "Earum, in, illo, molestiae accusantium natus recusandae vel nihil " +
        "blanditiis labore minus ut explicabo non architecto eum?",
      image: "/images/3.jpg",
    },
    {
      id: 2,
      name: "Tinolang bangus",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit",
      image: "/images/4.jpg",
      averageRating: 4,
    },
    {
      id: 3,
      name: "Sinanlag nga bugas",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit," +
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit",
      image: "/images/6.jpg",
      averageRating: 2,
    },
  ];

  return {
    props: {
      items,
    },
    revalidate: false,
  };
};

const Recipes: NextPage<Props> = ({ items }) => {
  return (
    <React.Fragment>
      <Head>
        <title>Recipes</title>
      </Head>

      <div className="min-h-screen bg-gray-100">
        <Header />

        <main className="flex-grow">
          <div className="flex">
            <Sidebar />

            <section className="p-8 flex-grow">
              <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 grid-flow-row-dense">
                {items.map((item) => (
                  <Item {...item} key={item.id} />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
};

const Item: React.FC<Item> = ({
  id,
  name,
  image,
  description,
  averageRating,
}) => {
  return (
    <Link href={"/recipes/".concat(id.toString())} passHref>
      <a
        className="bg-white shadow-md group hover:ring-4 hover:ring-blue-200"
        key={name}
      >
        <figure className="w-full h-[250px] relative overflow-hidden">
          <div className="absolute w-full h-full z-20 top-0 left-0 bg-black bg-opacity-50 hidden group-hover:flex items-center justify-center" />

          <Image
            src={image}
            alt=""
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </figure>

        <article className="p-4">
          <h4 className="text-xl">{name}</h4>
          <p className="text-sm text-gray-700 truncate">{description}</p>

          <div className="mt-2">
            <Rating value={averageRating} />
          </div>
        </article>
      </a>
    </Link>
  );
};

export default Recipes;
