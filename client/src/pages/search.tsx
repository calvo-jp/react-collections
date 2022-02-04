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

      <div></div>
    </React.Fragment>
  );
};

export default Search;
