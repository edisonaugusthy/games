import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Mapper } from '../../../shared/infra/Mapper';
import { Game } from '../domain/game';
import { GameName } from '../domain/gameName';
import { GamePublisherName } from '../domain/gamePublisher';
import { Timestamp } from 'firebase/firestore';
import { GameDTO } from '../dtos/GameDTO';

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

  public static toDomain(raw: any): Game {
    const timestamp = new Timestamp(raw.releaseYear.seconds, raw.releaseYear.nanoseconds);
    const gameOrError = Game.create(
      {
        name: GameName.create({ name: raw.name }).getValue(),
        releaseYear: timestamp.toDate(),
        players: raw.players ? raw.players : null,
        publisher: GamePublisherName.create({ name: raw.publisher }).getValue(),
        expansions: raw.expansions ? raw.expansions : null,
        type: raw.type,
        isDeleted: false
      },
      new UniqueEntityID(raw.id)
    );
    gameOrError.isFailure ? console.log(gameOrError.getErrorValue()) : '';

    if (gameOrError.isSuccess) {
      return gameOrError.getValue();
    } else {
      throw new Error(`Failed to create Game domain object: ${gameOrError.getErrorValue()}`);
    }
  }

  public static toDTO(game: Game): GameDTO {
    return {
      gameId: game.gameId.getValue().toString(),
      name: game.name.value,
      releaseYear: game.releaseYear,
      players: game.players,
      publisher: game.publisher.value,
      expansions: game.expansions,
      type: game.type
    };
  }
}
