import { IGameRepo } from '../gameRepo';
import { gamesCollection, db } from './../../../../shared/infra/database/firebase/models/Game';
import { GameName } from '../../domain/gameName';
import { Game } from '../../domain/game';
import { GameMap } from '../../mappers/gameMap';

export class FirebaseGameRepo implements IGameRepo {
  private models: typeof gamesCollection;

  constructor(models: typeof gamesCollection) {
    this.models = models;
  }

  async exists(gameName: GameName): Promise<boolean> {
    const nameRef = await this.models.where('name', '==', gameName.value).get();
    if (nameRef.size > 0) {
      return true;
    } else {
      return false;
    }
  }

  async bulkSave(games: Game[]): Promise<void> {
    const batch = db.batch();
    for (let i = 0; i < games.length; i++) {
      const game = await GameMap.toPersistence(games[i]);
      const gameRef = db.collection('Games').doc(game.id);
      batch.set(gameRef, game);
    }
    await batch.commit();
    return;
  }
}
