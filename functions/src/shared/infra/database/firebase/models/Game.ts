import { getFirestore } from "firebase-admin/firestore";

const db = getFirestore();
const Games = db.collection("Games");
export default Games;
