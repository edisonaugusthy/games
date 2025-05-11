import Games from "../../../shared/infra/database/firebase/models/Game";
import { FirebaseGameRepo } from "./implementations/firebaseGameRepo";

const gameRepo = new FirebaseGameRepo(Games);

export { gameRepo };
