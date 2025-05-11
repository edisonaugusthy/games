import { Game } from "../domain/game";
import { GameName } from "../domain/gameName";

export interface IGameRepo {
  exists(gameName: GameName): Promise<boolean>;
  save(game: Game): Promise<void>;
}
