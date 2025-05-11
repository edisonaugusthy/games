import { Either, Result, left, right } from "../../../../shared/core/Result";
import { AppError } from "../../../../shared/core/AppError";
import { UseCase } from "../../../../shared/core/UseCase";
import { DeleteGameDTO } from "./DeleteGameDTO";
import { DeleteGameErrors } from "./DeleteGameErrors";

type Response = Either<
  AppError.UnexpectedError | DeleteGameErrors.GameNotFoundError,
  Result<void>
>;

export class DeleteGameUseCase
  implements UseCase<DeleteGameDTO, Promise<Response>>
{
  // private gameRepo: IGameRepo;

  // constructor(gameRepo: IGameRepo) {
  //   this.gameRepo = gameRepo;
  // }

  public async execute(request: DeleteGameDTO): Promise<any> {
    try {
      const game = null;
      // const user = await this.gameRepo.getUserByUserId(request.gameId);
      const gameFound = !!game;

      if (!gameFound) {
        return left(new DeleteGameErrors.GameNotFoundError("tes"));
      }

      // user.delete();

      // await this.gameRepo.save(user);

      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
