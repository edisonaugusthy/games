import { Game } from '../domain/game';
import { GameName } from '../domain/gameName';

export interface IGameRepo {
  exists(gameName: GameName): Promise<boolean>;
  bulkSave(games: Game[]): Promise<void>;
}
