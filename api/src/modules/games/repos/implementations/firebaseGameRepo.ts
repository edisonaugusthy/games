import { IGameRepo } from '../gameRepo';
import { GameName } from '../../domain/gameName';
import { Game } from '../../domain/game';
import { GameMap } from '../../mappers/gameMap';
import { filestoreDb } from '../../../../shared/infra/database/firebase/config/config';
import { collection, doc, getDocs, query, where, writeBatch } from 'firebase/firestore';

export class FirebaseGameRepo implements IGameRepo {
  async exists(gameName: GameName): Promise<boolean> {
    const collectionRef = collection(filestoreDb, 'Games');
    const q = query(collectionRef, where('name', '==', gameName.value));
    const docs = await getDocs(q);
    return docs.size > 0;
  }

  async bulkSave(games: Game[]): Promise<void> {
    const batch = writeBatch(filestoreDb);
    for (const game of games) {
      const persistedGame = await GameMap.toPersistence(game);
      const docRef = doc(filestoreDb, 'Games', persistedGame.id);
      batch.set(docRef, persistedGame);
    }
    await batch.commit();
    return;
  }
}
