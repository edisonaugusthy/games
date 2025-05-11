import { Mapper } from "../../../shared/infra/Mapper";
import { Game } from "../domain/game";

export class GameMap implements Mapper<Game> {
  public static async toPersistence(game: Game): Promise<any> {
    return {
      id: game.gameId.getValue(),
      name: game.name.value,
      releaseYear: game.releaseYear,
      players: game.players,
      publisher: game.publisher.value,
      expansions: game.expansions,
      type: game.type,
    };
  }
}
