import { createUserWithEmailAndPassword } from 'firebase/auth';
import Head from 'next/head';
import * as React from 'react';
import firebaseAuth from 'utils/firebase/auth';

interface Credential {
  email: string;
  password: string;
}

const createAccount = async (credential: Credential) => {
  try {
    const data = await createUserWithEmailAndPassword(
      firebaseAuth,
      credential.email,
      credential.password
    );

    return data.user;
  } catch (e: any) {
    return e.message;
  }
};

const CreateAccount = () => {
  return (
    <div>
      <Head>
        <title>Create Account</title>
      </Head>
    </div>
  );
};

export default CreateAccount;
