import { IGameRepo } from '../gameRepo';
import { GameName } from '../../domain/gameName';
import { Game } from '../../domain/game';
import { GameMap } from '../../mappers/gameMap';
import { filestoreDb } from '../../../../shared/infra/database/firebase/config/config';
import { collection, doc, getDocs, query, where, writeBatch } from 'firebase/firestore';

export class FirebaseGameRepo implements IGameRepo {
  private readonly collectionName = 'Games';
  async exists(gameName: GameName): Promise<boolean> {
    const collectionRef = collection(filestoreDb, this.collectionName);
    const q = query(collectionRef, where('name', '==', gameName.value));
    const docs = await getDocs(q);
    return docs.size > 0;
  }

  async bulkSave(games: Game[]): Promise<void> {
    const batch = writeBatch(filestoreDb);
    for (const game of games) {
      const persistedGame = await GameMap.toPersistence(game);
      const docRef = doc(filestoreDb, this.collectionName, persistedGame.id);
      batch.set(docRef, persistedGame);
    }
    await batch.commit();
    return;
  }

  async getAll(): Promise<Game[]> {
    const gamesCollectionRef = collection(filestoreDb, this.collectionName);
    const querySnapshot = await getDocs(gamesCollectionRef);
    const games: Game[] = [];

    querySnapshot.forEach(doc => {
      const gameData = doc.data();
      const game = GameMap.toDomain(gameData);
      games.push(game);
    });

    return games;
  }
}
