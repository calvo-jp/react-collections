import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Form, Formik } from 'formik';
import Head from 'next/head';
import * as React from 'react';
import firebaseAuth from 'utils/firebase/auth';
import sha256 from 'utils/sha256';
import Button from 'widgets/Button';
import TextField from 'widgets/TextField';
import * as yup from 'yup';

interface Credential {
  displayName: string;
  email: string;
  password: string;
}

const createAccount = async (credential: Credential) => {
  const data = await createUserWithEmailAndPassword(
    firebaseAuth,
    credential.email,
    credential.password
  );

  const hashed = await sha256(credential.email);

  await updateProfile(data.user, {
    displayName: credential.displayName,
    photoURL: 'https://www.gravatar.com/avatar/' + hashed + '?default=retro',
  });

  return data.user;
};

const CreateAccount = () => {
  return (
    <div>
      <Head>
        <title>Create Account</title>
      </Head>

      <div>
        <Formik
          initialValues={{ displayName: '', email: '', password: '' }}
          validationSchema={yup.object().shape({
            displayName: yup
              .string()
              .min(4, 'name must be 4 or more characters')
              .max(25, 'name must not be more than 25 characters')
              .required('name is required'),
            email: yup
              .string()
              .email('invalid email format')
              .required('email is required'),
            password: yup
              .string()
              .min(5, 'password must be 5 or more characters')
              .max(100, 'password must not be more than 100 characters')
              .required('password is required'),
          })}
          onSubmit={(credential, { setSubmitting }) => {
            createAccount(credential).then((user) => {
              console.log(user);
              setSubmitting(false);
            });
          }}
        >
          {({
            isSubmitting,
            handleBlur,
            handleChange,
            values,
            errors,
            touched,
          }) => (
            <Form className="flex flex-col gap-2 p-2">
              <TextField
                name="displayName"
                label="Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.displayName}
                error={touched.displayName && !!errors.displayName}
                helperText={errors.displayName}
                autoFocus
              />
              <TextField
                name="email"
                label="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={touched.email && !!errors.email}
                helperText={errors.email}
              />
              <TextField
                name="password"
                label="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={touched.password && !!errors.password}
                helperText={errors.password}
              />

              <Button
                type="submit"
                label=" Create account"
                variant="contained"
                color="primary"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateAccount;
