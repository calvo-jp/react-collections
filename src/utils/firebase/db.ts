import { getFirestore } from 'firebase/firestore';
import firebaseApp from './app';

const firebaseDb = getFirestore(firebaseApp);
export default firebaseDb;
