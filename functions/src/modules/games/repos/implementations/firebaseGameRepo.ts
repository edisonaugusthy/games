import { IGameRepo } from "../gameRepo";
import Games from "../../../../shared/infra/database/firebase/models/Game";
import { GameName } from "../../domain/gameName";
import { Game } from "../../domain/game";
import { GameMap } from "../../mappers/gameMap";

export class FirebaseGameRepo implements IGameRepo {
  private models: typeof Games;

  constructor(models: typeof Games) {
    this.models = models;
  }

  async exists(gameName: GameName): Promise<boolean> {
    const nameRef = await this.models.where("name", "==", gameName.value).get();
    if (nameRef.size > 0) {
      return true;
    } else {
      return false;
    }
  }

  async save(game: Game): Promise<void> {
    const exists = await this.exists(game.name);
    if (!exists) {
      const rawGame = await GameMap.toPersistence(game);
      await this.models.doc(rawGame.id).set(rawGame);
    }

    return;
  }
}
