import { IGameRepo } from '../gameRepo';
import { GameName } from '../../domain/gameName';
import { Game } from '../../domain/game';
import { GameMap } from '../../mappers/gameMap';
import { filestoreDb } from '../../../../shared/infra/database/firebase/config/config';
import { collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where, writeBatch } from 'firebase/firestore';
import { GameId } from '../../domain/gameId';

export class FirebaseGameRepo implements IGameRepo {
  private readonly collectionName = 'Games';
  async exists(gameName: GameName): Promise<boolean> {
    const collectionRef = collection(filestoreDb, this.collectionName);
    const q = query(collectionRef, where('name', '==', gameName.value));
    const docs = await getDocs(q);
    return docs.size > 0;
  }

  async save(game: Game): Promise<void> {
    const batch = writeBatch(filestoreDb);
    const persistedGame = await GameMap.toPersistence(game);
    const docRef = doc(filestoreDb, this.collectionName, persistedGame.id);
    batch.set(docRef, persistedGame);
    await batch.commit();
    return;
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

  async getOneById(gameId: GameId): Promise<Game | null> {
    const collectionRef = collection(filestoreDb, this.collectionName);
    const q = query(collectionRef, where('id', '==', gameId.getValue().toString()));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return null;
    }
    const gameDoc = querySnapshot.docs[0];
    const game = GameMap.toDomain(gameDoc.data());

    return game;
  }

  async updateOneById(game: Game): Promise<void> {
    const gameId = game.id.toString();
    const persistedGame = await GameMap.toPersistence(game);
    const gameDocRef = doc(filestoreDb, this.collectionName, gameId);
    const docSnap = await getDoc(gameDocRef);
    if (!docSnap.exists()) {
      throw new Error(`Cannot update game with ID ${gameId}: Document does not exist`);
    }
    await updateDoc(gameDocRef, persistedGame);
  }

  async deleteById(gameId: GameId): Promise<void> {
    const gameIdString = gameId.getValue().toString();
    const gameDocRef = doc(filestoreDb, this.collectionName, gameIdString);
    await deleteDoc(gameDocRef);
    return;
  }
}
