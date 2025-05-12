import { Either, Result, left, right } from '../../../../shared/core/Result';
import { AppError } from '../../../../shared/core/AppError';
import { UseCase } from '../../../../shared/core/UseCase';
import { DeleteGameDTO } from './DeleteGameDTO';
import { DeleteGameErrors } from './DeleteGameErrors';
import { IGameRepo } from '../../repos/gameRepo';
import { GameId } from '../../domain/gameId';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';

type Response = Either<AppError.UnexpectedError | DeleteGameErrors.GameNotFoundError, Result<void>>;

export class DeleteGameUseCase implements UseCase<DeleteGameDTO, Promise<Response>> {
  private gameRepo: IGameRepo;

  constructor(gameRepo: IGameRepo) {
    this.gameRepo = gameRepo;
  }

  public async execute(request: DeleteGameDTO): Promise<any> {
    try {
      const idOrError = GameId.create(new UniqueEntityID(request.gameId)).getValue();
      const game = await this.gameRepo.getOneById(idOrError);
      console.log(game);
      const gameFound = !!game;
      if (!gameFound) {
        return left(new DeleteGameErrors.GameNotFoundError(request.gameId));
      }
      game.delete();
      await this.gameRepo.deleteById(idOrError);

      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
