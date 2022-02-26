import BellIcon from "@heroicons/react/solid/BellIcon";
import StarIcon from "@heroicons/react/solid/StarIcon";
import clsx from "clsx";
import Layout from "layouts/Layout";
import Head from "next/head";
import * as React from "react";

const Dashboard = () => {
  return (
    <Layout>
      <Head>
        <title>Dashboard</title>
      </Head>

      <div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <Item
            gradientBg="from-orange-400 to-yellow-500 dark:from-orange-600 dark:to-yellow-700"
            label="Average Rating"
            value={4}
            icon={StarIcon}
          />

          <Item
            gradientBg="from-blue-400 to-violet-400 dark:from-sky-600 dark:to-blue-600"
            label="Notifications"
            value={13}
            icon={BellIcon}
          />
        </div>
      </div>
    </Layout>
  );
};

interface ItemProps {
  icon: (props: React.ComponentProps<"svg">) => JSX.Element;
  label: string;
  value: number;
  gradientBg: string;
}

const Item = ({
  icon: SVGIcon,
  label,
  value,
  gradientBg: className,
}: ItemProps) => {
  return (
    <div>
      <div
        className={clsx(
          "flex items-center gap-4 bg-gradient-to-r p-6 shadow-md",
          className
        )}
      >
        <SVGIcon className="h-20 w-20 fill-white" />

        <div className="flex-col gap-2 text-white">
          <div className="text-sm">{label}</div>
          <div className="text-3xl">{value}</div>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default Dashboard;
