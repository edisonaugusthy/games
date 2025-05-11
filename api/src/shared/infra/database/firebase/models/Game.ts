import { getFirestore } from 'firebase-admin/firestore';

const db = getFirestore();
const gamesCollection = db.collection('Games');
export { gamesCollection, db };
