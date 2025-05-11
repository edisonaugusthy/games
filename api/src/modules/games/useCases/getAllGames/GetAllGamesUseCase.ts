import { Either, Result, left, right } from '../../../../shared/core/Result';
import { AppError } from '../../../../shared/core/AppError';
import { UseCase } from '../../../../shared/core/UseCase';
import { Game } from '../../domain/game';
import { IGameRepo } from '../../repos/gameRepo';

type Response = Either<AppError.UnexpectedError, Result<Game[]>>;

export class GetAllGamesUseCase implements UseCase<undefined, Promise<Response>> {
  private gameRepo: IGameRepo;

  constructor(userRepo: IGameRepo) {
    this.gameRepo = userRepo;
  }

  public async execute(): Promise<Response> {
    try {
      const games = await this.gameRepo.getAll();
      return right(Result.ok<Game[]>(games));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
