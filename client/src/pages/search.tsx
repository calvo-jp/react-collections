import useQuery from 'hooks/useQuery';
import HeaderTwo from 'layouts/HeaderTwo';
import Searchbar from 'layouts/Searchbar';
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
        <HeaderTwo redirect={origin} />

        <div className="max-w-[900px] mx-auto p-4">
          <form className="py-8" onSubmit={handleSubmit}>
            <Searchbar autoFocus />
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Search;
