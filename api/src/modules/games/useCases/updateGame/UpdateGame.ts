import { Either, Result, left, right } from '../../../../shared/core/Result';
import { AppError } from '../../../../shared/core/AppError';
import { UseCase } from '../../../../shared/core/UseCase';
import { EditGameErrors } from './UpdateGameErrors';
import { UpdateGameDTO } from './UpdateGameDTO';
import { GameName } from '../../domain/gameName';
import { GamePublisherName } from '../../domain/gamePublisher';
import { Game, GameType } from '../../domain/game';
import { Guard } from '../../../../shared/core/Guard';
import { IGameRepo } from '../../repos/gameRepo';
import { GameId } from '../../domain/gameId';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';

type Response = Either<EditGameErrors.GameNotFoundError | AppError.UnexpectedError | Result<any>, Result<void>>;

export class UpdateGameUseCase implements UseCase<UpdateGameDTO, Promise<Response>> {
  private gameRepo: IGameRepo;
  constructor(userRepo: IGameRepo) {
    this.gameRepo = userRepo;
  }

  async execute(request: UpdateGameDTO): Promise<Response> {
    let game: Game | null;

    const idOrError = GameId.create(new UniqueEntityID(request.gameId)).getValue();
    game = await this.gameRepo.getOneById(idOrError);
    if (game) {
      const nameOrError = GameName.create({ name: request.name });
      const publisherOrError = GamePublisherName.create({
        name: request.publisher
      });
      const gameTypeOrError = Guard.isOneOf(request.type, [GameType.BaseGame, GameType.Expansion], 'GameType');
      const dtoResult = Result.combine([nameOrError, publisherOrError, gameTypeOrError]);
      if (dtoResult.isFailure) {
        return left(Result.fail<void>(dtoResult.getErrorValue())) as Response;
      }

      const name: GameName = nameOrError.getValue();
      const publisher: GamePublisherName = publisherOrError.getValue();
      game.updateName(name);
      game.updateType(request.type as GameType);
      game.updatePublisher(publisher);
      try {
        await this.gameRepo.updateOneById(game);
        return right(Result.ok<void>());
      } catch (error) {
        return left(new AppError.UnexpectedError(error)) as Response;
      }
    } else {
      return left(new EditGameErrors.GameNotFoundError(request.name));
    }
  }
}
