import { Either, Result, left, right } from '../../../../shared/core/Result';
import { AppError } from '../../../../shared/core/AppError';
import { UseCase } from '../../../../shared/core/UseCase';
import { CreateGameErrors } from './CreateGameErrors';
import { CreateGameDTO } from './CreateGameDTO';
import { GameName } from '../../domain/gameName';
import { GamePublisherName } from '../../domain/gamePublisher';
import { Game, GameType } from '../../domain/game';
import { Guard } from '../../../../shared/core/Guard';
import { IGameRepo } from '../../repos/gameRepo';

type Response = Either<
  | CreateGameErrors.GameAlreadyExistsError
  | CreateGameErrors.GameNameAlreadyTakenError
  | AppError.UnexpectedError
  | Result<any>,
  Result<Game[]>
>;

export class CreateGameUseCase implements UseCase<CreateGameDTO[], Promise<Response>> {
  private gameRepo: IGameRepo;
  private games: Game[] = [];
  constructor(userRepo: IGameRepo) {
    this.gameRepo = userRepo;
  }

  async execute(request: CreateGameDTO[]): Promise<Response> {
    for (let i = 0; i < request.length; i++) {
      const game = request[i];
      const nameOrError = GameName.create({ name: game.name });
      const publisherOrError = GamePublisherName.create({
        name: game.publisher
      });
      const gameTypeOrError = Guard.isOneOf(game.type, [GameType.BaseGame, GameType.Expansion], 'GameType');
      const dtoResult = Result.combine([nameOrError, publisherOrError, gameTypeOrError]);
      if (dtoResult.isFailure) {
        return left(Result.fail<void>(dtoResult.getErrorValue())) as Response;
      }
      const name: GameName = nameOrError.getValue();
      const publisher: GamePublisherName = publisherOrError.getValue();
      const gameAlreadyExists = await this.gameRepo.exists(name);

      if (gameAlreadyExists) {
        return left(new CreateGameErrors.GameAlreadyExistsError(name.value)) as Response;
      }
      const gameOrError: Result<Game> = Game.create({
        name,
        releaseYear: new Date(),
        publisher,
        type: game.type,
        isDeleted: false
      });
      if (gameOrError.isFailure) {
        return left(Result.fail<Game>(gameOrError.getErrorValue().toString())) as Response;
      }
      this.games.push(gameOrError.getValue());
    }

    try {
      await this.gameRepo.bulkSave(this.games);

      return right(Result.ok<Game[]>(this.games));
    } catch (err) {
      return left(new AppError.UnexpectedError(err)) as Response;
    }
  }
}
