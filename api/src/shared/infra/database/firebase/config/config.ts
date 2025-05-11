import { FirebaseApp, initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDJ58Me_eVPmDy-IGGQqNoxOl1v-bDuZq4',
  authDomain: 'fir-project-288ad.firebaseapp.com',
  projectId: 'fir-project-288ad',
  storageBucket: 'fir-project-288ad.firebasestorage.app',
  messagingSenderId: '277843026623',
  appId: '1:277843026623:web:19619bf5412d36db499c0a',
  measurementId: 'G-WCZDDR7K9L'
};

let app: FirebaseApp;
let filestoreDb: Firestore;
const initializeFirebase = () => {
  try {
    app = initializeApp(firebaseConfig);
    filestoreDb = getFirestore();
  } catch (error) {
    console.error(error);
  }
};

const getFirebaseApp = () => app;

export { initializeFirebase, getFirebaseApp, filestoreDb };
