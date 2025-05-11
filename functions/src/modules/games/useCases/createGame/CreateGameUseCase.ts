import { Either, Result, left, right } from '../../../../shared/core/Result';
import { AppError } from '../../../../shared/core/AppError';
import { UseCase } from '../../../../shared/core/UseCase';
import { CreateGameErrors } from './CreateGameErrors';
import { CreateGameDTO } from './CreateGameDTO';
import { GameName } from '../../domain/gameName';
import { GamePublisherName } from '../../domain/gamePublisher';
import { Game, GameType } from '../../domain/game';
import { Guard } from '../../../../shared/core/Guard';

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
  //   private userRepo: IUserRepo;

  //   constructor(userRepo: IUserRepo) {
  //     this.userRepo = userRepo;
  //   }

  async execute(request: CreateGameDTO): Promise<Response> {
    const nameOrError = GameName.create({ name: request.name });
    const publisherOrError = GamePublisherName.create({
      name: request.publisher,
    });
    const gameTypeOrError = Guard.isOneOf(
      request.type,
      [GameType.BaseGame, GameType.Expansion],
      'GameType'
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
      const userAlreadyExists = false; //await this.userRepo.exists(name);

      if (userAlreadyExists) {
        return left(
          new CreateGameErrors.GameAlreadyExistsError(name.value)
        ) as Response;
      }

      try {
        const alreadyCreatedUserByUserName = 'q';
        //await this.userRepo.getUserByUserName(publisher);

        const userNameTaken = !!alreadyCreatedUserByUserName === true;

        if (userNameTaken) {
          return left(
            new CreateGameErrors.GameNameAlreadyTakenError(publisher.value)
          ) as Response;
        }
      } catch (err) {}

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

      // await this.userRepo.save(game);

      return right(Result.ok<Game>(game));
    } catch (err) {
      return left(new AppError.UnexpectedError(err)) as Response;
    }
  }
}
