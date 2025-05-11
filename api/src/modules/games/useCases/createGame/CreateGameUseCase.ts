import { Either, Result, left, right } from "../../../../shared/core/Result";
import { AppError } from "../../../../shared/core/AppError";
import { UseCase } from "../../../../shared/core/UseCase";
import { CreateGameErrors } from "./CreateGameErrors";
import { CreateGameDTO } from "./CreateGameDTO";
import { GameName } from "../../domain/gameName";
import { GamePublisherName } from "../../domain/gamePublisher";
import { Game, GameType } from "../../domain/game";
import { Guard } from "../../../../shared/core/Guard";
import { IGameRepo } from "../../repos/gameRepo";

type Response = Either<
  | CreateGameErrors.GameAlreadyExistsError
  | CreateGameErrors.GameNameAlreadyTakenError
  | AppError.UnexpectedError
  | Result<any>,
  Result<Game>
>;

export class CreateGameUseCase
  implements UseCase<CreateGameDTO, Promise<Response>>
{
  private gameRepo: IGameRepo;

  constructor(userRepo: IGameRepo) {
    this.gameRepo = userRepo;
  }

  async execute(request: CreateGameDTO): Promise<Response> {
    const nameOrError = GameName.create({ name: request.name });
    const publisherOrError = GamePublisherName.create({
      name: request.publisher,
    });
    const gameTypeOrError = Guard.isOneOf(
      request.type,
      [GameType.BaseGame, GameType.Expansion],
      "GameType"
    );
    const dtoResult = Result.combine([
      nameOrError,
      publisherOrError,
      gameTypeOrError,
    ]);
    if (dtoResult.isFailure) {
      return left(Result.fail<void>(dtoResult.getErrorValue())) as Response;
    }
    const name: GameName = nameOrError.getValue();
    const publisher: GamePublisherName = publisherOrError.getValue();

    try {
      const gameAlreadyExists = await this.gameRepo.exists(name);

      if (gameAlreadyExists) {
        return left(
          new CreateGameErrors.GameAlreadyExistsError(name.value)
        ) as Response;
      }
      const userOrError: Result<Game> = Game.create({
        name,
        releaseYear: new Date(),
        publisher,
        type: request.type,
        isDeleted: false,
      });
      if (userOrError.isFailure) {
        return left(
          Result.fail<Game>(userOrError.getErrorValue().toString())
        ) as Response;
      }
      const game: Game = userOrError.getValue();
      await this.gameRepo.save(game);

      return right(Result.ok<Game>(game));
    } catch (err) {
      return left(new AppError.UnexpectedError(err)) as Response;
    }
  }
}
