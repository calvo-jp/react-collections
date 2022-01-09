import CheckIcon from '@heroicons/react/outline/CheckIcon';
import PlusIcon from '@heroicons/react/outline/PlusIcon';
import SearchIcon from '@heroicons/react/outline/SearchIcon';
import CloseIcon from '@heroicons/react/outline/XIcon';
import clsx from 'clsx';
import useQuery from 'hooks/useQuery';
import HeaderTwo from 'layouts/HeaderTwo';
import Head from 'next/head';
import * as React from 'react';
import IRecipe from 'types/recipe';

const Search = () => {
  const query = useQuery('keyword', 'origin');

  const origin = [query.origin].flat(1).at(0) || '/';
  const keyword = [query.keyword].flat(1).at(0);

  const [loading, setLoading] = React.useState(true);
  const [records, setRecords] = React.useState<IRecipe[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  React.useEffect(() => {
    if (keyword) {
      // search logic
    }

    return () => {
      setLoading(true);
      setRecords([]);
    };
  }, [keyword]);

  return (
    <React.Fragment>
      <Head>
        <title>{!keyword ? 'Search' : keyword}</title>
      </Head>

      <div>
        <HeaderTwo url={origin} />

        <div className="max-w-[900px] mx-auto p-4">
          <form className="py-8" onSubmit={handleSubmit}>
            <Searchbar />
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

const Searchbar = () => {
  const [focused, setFocused] = React.useState(true);

  return (
    <div
      className={clsx(
        'p-2 border rounded-md flex w-full items-center relative',
        focused && 'border-blue-400 ring-4 ring-blue-200',
        !focused && 'border-gray-200'
      )}
    >
      <label htmlFor="" className="absolute text-sm -top-3 bg-white px-1">
        Search
      </label>

      <input className="grow outline-none" value="jp calvo" />

      <button className="ml-1">
        <CloseIcon className="w-4 h-4 text-gray-400" />
      </button>

      <div className="h-4 w-px bg-gray-200 mx-3" />

      <SearchIcon className="w-5 h-5" />
    </div>
  );
};

export default Search;
