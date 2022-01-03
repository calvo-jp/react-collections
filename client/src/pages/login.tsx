import Head from 'next/head';
import Link from 'next/link';
import * as React from 'react';
import Alert from 'widgets/Alert';
import Button from 'widgets/Button';
import TextField from 'widgets/TextField';

interface Credential {
  username: string;
  password: string;
}

const Login = () => {
  const [credential, setCredential] = React.useState<Credential>({
    username: 'calvojp',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredential((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <React.Fragment>
      <Head>
        <title>Login</title>
      </Head>

      <div className="min-h-screen flex flex-col justify-center">
        <main>
          <div className="max-w-[350px] mx-auto p-2 flex flex-col gap-4">
            <Alert open variant="error" onClose={function () {}}>
              <p>Invalid username or password</p>
            </Alert>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <TextField
                id="username"
                name="username"
                label="username"
                onChange={handleChange}
                value={credential.username}
                autoFocus
                fullWidth
              />

              <div className="w-full">
                <TextField
                  id="password"
                  name="password"
                  type="password"
                  label="password"
                  onChange={handleChange}
                  value={credential.password}
                  fullWidth
                  error
                  errorText="Password is required"
                />
                <p className="text-sm mt-1.5">
                  <span>Forgot password?</span>

                  <Link href="/account-recovery" passHref>
                    <a tabIndex={-1} className="ml-1 text-blue-600">
                      Click here
                    </a>
                  </Link>
                </p>
              </div>

              <Button variant="primary" type="submit" fullWidth>
                Login
              </Button>
            </form>

            <div className="text-center mt-4 text-gray-600">
              <span>No account?</span>

              <Link href="/create-account" passHref>
                <a className="ml-1 font-bold">Sign up</a>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
};

export default Login;
