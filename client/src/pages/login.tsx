import { Form, Formik } from 'formik';
import useStoreState from 'hooks/store/useState';
import Brand from 'layouts/Brand';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import Alert from 'widgets/Alert';
import Button from 'widgets/Button';
import TextField from 'widgets/TextField';
import * as yup from 'yup';

const Login = () => {
  const router = useRouter();
  const [globalState, setGlobalState] = useStoreState();

  // login error
  const [error, setError] = React.useState<string>();

  if (globalState.authorized) router.push('/recipes');

  return (
    <React.Fragment>
      <Head>
        <title>Login</title>
      </Head>

      <div className="min-h-screen flex flex-col justify-center md:bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-300">
        <main>
          <div className="max-w-[350px] mx-auto p-2 md:p-8 md:shadow-md flex flex-col gap-4 bg-white">
            <div className="w-fit mx-auto mb-4">
              <Brand />
            </div>

            <Alert
              open={!!error}
              variant="error"
              onClose={() => setError(undefined)}
            >
              <p>{error}</p>
            </Alert>

            <Formik
              initialValues={{
                username: '',
                password: '',
              }}
              validationSchema={yup.object().shape({
                username: yup
                  .string()
                  .email('username must be an email')
                  .required('username is required'),
                password: yup
                  .string()
                  .min(5, 'password must be 5 characters or more')
                  .max(100, 'password must be 100 characters or less')
                  .required('password is required'),
              })}
              onSubmit={(values) => {}}
            >
              {({
                values,
                handleChange,
                handleBlur,
                isSubmitting,
                errors,
                touched,
              }) => (
                <Form className="flex flex-col gap-3">
                  <TextField
                    id="username"
                    type="email"
                    name="username"
                    label="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    error={touched.username && !!errors.username}
                    helperText={errors.username}
                    autoFocus
                    fullWidth
                    autoComplete="off"
                  />

                  <div className="w-full">
                    <TextField
                      id="password"
                      name="password"
                      type="password"
                      label="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      error={touched.password && !!errors.password}
                      helperText={errors.password}
                      fullWidth
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

                  <Button
                    type="submit"
                    label="Login"
                    color="primary"
                    variant="contained"
                    fullWidth
                    disabled={isSubmitting}
                  />
                </Form>
              )}
            </Formik>

            <div className="text-center mt-2">
              <span className="text-gray-500">No account?</span>

              <Link href="/create-account" passHref>
                <a className="ml-1 font-bold text-gray-600 hover:text-blue-500 transition-colors duration-300">
                  Sign up
                </a>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
};

export default Login;
