import { Result, left, right } from '../../../../shared/core/Result';
import { AppError } from '../../../../shared/core/AppError';
import { UseCase } from '../../../../shared/core/UseCase';
import { CreateGamesErrors } from './CreateGamesErrors';
import { CreateGamesDTO } from './CreateGamesDTO';
import { GameName } from '../../domain/gameName';
import { GamePublisherName } from '../../domain/gamePublisher';
import { Game, GameType } from '../../domain/game';
import { Guard } from '../../../../shared/core/Guard';
import { IGameRepo } from '../../repos/gameRepo';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';
import { CreateGamesResponse } from './CreateGamesResponse';

export class CreateGamesUseCase implements UseCase<CreateGamesDTO[], Promise<CreateGamesResponse>> {
  private gameRepo: IGameRepo;
  private games: Game[] = [];
  constructor(userRepo: IGameRepo) {
    this.gameRepo = userRepo;
  }

  async execute(request: CreateGamesDTO[]): Promise<CreateGamesResponse> {
    for (let i = 0; i < request.length; i++) {
      const game = request[i];
      const nameOrError = GameName.create({ name: game.name });
      const publisherOrError = GamePublisherName.create({
        name: game.publisher
      });
      const gameTypeOrError = Guard.isOneOf(game.type, [GameType.BaseGame, GameType.Expansion], 'GameType');
      const dtoResult = Result.combine([nameOrError, publisherOrError, gameTypeOrError]);
      if (dtoResult.isFailure) {
        return left(Result.fail<void>(dtoResult.getErrorValue())) as CreateGamesResponse;
      }
      const name: GameName = nameOrError.getValue();
      const publisher: GamePublisherName = publisherOrError.getValue();
      const gameAlreadyExists = await this.gameRepo.exists(name);

      if (gameAlreadyExists) {
        return left(new CreateGamesErrors.GameAlreadyExistsError(name.value)) as CreateGamesResponse;
      }
      const gameOrError: Result<Game> = Game.create(
        {
          name,
          releaseYear: new Date(),
          players: game.players,
          expansions: game.expansions ?? null,
          publisher: publisher ?? null,
          type: game.type,
          isDeleted: false
        },
        new UniqueEntityID(game.id)
      );
      if (gameOrError.isFailure) {
        return left(Result.fail<Game>(gameOrError.getErrorValue().toString())) as CreateGamesResponse;
      }
      this.games.push(gameOrError.getValue());
    }

    try {
      await this.gameRepo.bulkSave(this.games);

      return right(Result.ok<Game[]>(this.games));
    } catch (err) {
      return left(new AppError.UnexpectedError(err)) as CreateGamesResponse;
    }
  }
}
