import { Mapper } from '../../../shared/infra/Mapper';
import { Game } from '../domain/game';

export class GameMap implements Mapper<Game> {
  public static async toPersistence(game: Game): Promise<any> {
    return {
      id: game.gameId.getValue().toString(),
      name: game.name.value,
      releaseYear: game.releaseYear,
      players: game.players ?? null,
      publisher: game.publisher.value,
      expansions: game.expansions ?? null,
      type: game.type
    };
  }
}
