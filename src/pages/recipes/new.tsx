import { Form, Formik } from 'formik';
import HeaderTwo from 'layouts/HeaderTwo';
import Head from 'next/head';
import * as React from 'react';
import Button from 'widgets/Button';
import TextField from 'widgets/TextField';
import * as yup from 'yup';

const CreateRecipe = () => {
  return (
    <React.Fragment>
      <Head>
        <title>New Recipe</title>
      </Head>

      <div className="flex flex-col min-h-screen">
        <HeaderTwo />

        <main className="flex-grow flex flex-col justify-center">
          <div>
            <Formik
              initialValues={{
                name: '',
                description: '',
              }}
              validationSchema={yup.object().shape({
                name: yup.string().min(5).max(25).required(),
                description: yup.string().min(10).max(255).required(),
              })}
              onSubmit={async (values) => {
                console.log(values);
              }}
            >
              {({
                handleBlur,
                handleChange,
                isSubmitting,
                values,
                errors,
                touched,
              }) => (
                <Form className="p-4 flex flex-col gap-3 max-w-[350px] mx-auto">
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    autoFocus
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    error={touched.name && !!errors.name}
                    helperText={errors.name}
                  />

                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    multiline
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    error={touched.description && !!errors.description}
                    helperText={errors.description}
                  />

                  <Button
                    type="submit"
                    label={isSubmitting ? 'loading...' : 'Submit'}
                    color="primary"
                    variant="contained"
                    disabled={isSubmitting}
                  />
                </Form>
              )}
            </Formik>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
};

export default CreateRecipe;
