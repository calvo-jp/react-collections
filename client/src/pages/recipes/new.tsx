import useQuery from 'hooks/useQuery';
import HeaderTwo from 'layouts/HeaderTwo';
import Head from 'next/head';
import * as React from 'react';
import Button from 'widgets/Button';
import TextField from 'widgets/TextField';

const CreateRecipe = () => {
  const query = useQuery('origin');
  const origin = [query.origin].flat(1).at(0) || '/';

  return (
    <React.Fragment>
      <Head>
        <title>New Recipe</title>
      </Head>

      <div className="flex flex-col min-h-screen">
        <HeaderTwo url={origin} label="Go back" />

        <main className="flex-grow flex flex-col justify-center">
          <div>
            <form className="p-4 flex flex-col gap-3 max-w-[350px] mx-auto">
              <TextField fullWidth label="Name" autoFocus />
              <TextField fullWidth label="Description" multiline />

              <Button
                type="submit"
                label="Submit"
                color="primary"
                variant="contained"
              />
            </form>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
};

export default CreateRecipe;
