import { Game } from '../domain/game';
import { GameId } from '../domain/gameId';
import { GameName } from '../domain/gameName';

export interface IGameRepo {
  exists(gameName: GameName): Promise<boolean>;
  getOneById(gameId: GameId): Promise<Game>;
  bulkSave(games: Game[]): Promise<void>;
  getAll(): Promise<Game[]>;
  updateOneById(games: Game): Promise<void>;
  deleteById(gameId: GameId): Promise<void>;
}
