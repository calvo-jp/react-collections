import { getAuth } from 'firebase/auth';
import firebaseApp from './app';

const firebaseAuth = getAuth(firebaseApp);

export default firebaseAuth;
