import { Result, left, right } from '../../../../shared/core/Result';
import { AppError } from '../../../../shared/core/AppError';
import { UseCase } from '../../../../shared/core/UseCase';
import { CreateGameErrors } from './CreateGameErrors';
import { CreateGameDTO } from './CreateGameDTO';
import { GameName } from '../../domain/gameName';
import { GamePublisherName } from '../../domain/gamePublisher';
import { Game, GameType } from '../../domain/game';
import { Guard } from '../../../../shared/core/Guard';
import { IGameRepo } from '../../repos/gameRepo';
import { CreateGameResponse } from './CreateGameResponse';

export class CreateGameUseCase implements UseCase<CreateGameDTO, Promise<CreateGameResponse>> {
  private gameRepo: IGameRepo;
  constructor(userRepo: IGameRepo) {
    this.gameRepo = userRepo;
  }

  async execute(request: CreateGameDTO): Promise<CreateGameResponse> {
    const nameOrError = GameName.create({ name: request.name });
    const publisherOrError = GamePublisherName.create({
      name: request.publisher
    });
    const gameTypeOrError = Guard.isOneOf(request.type, [GameType.BaseGame, GameType.Expansion], 'GameType');
    const dtoResult = Result.combine([nameOrError, publisherOrError, gameTypeOrError]);
    if (dtoResult.isFailure) {
      return left(Result.fail<void>(dtoResult.getErrorValue())) as CreateGameResponse;
    }
    const name: GameName = nameOrError.getValue();
    const publisher: GamePublisherName = publisherOrError.getValue();
    const gameAlreadyExists = await this.gameRepo.exists(name);

    if (gameAlreadyExists) {
      return left(new CreateGameErrors.GameAlreadyExistsError(name.value)) as CreateGameResponse;
    }
    const gameOrError: Result<Game> = Game.create({
      name,
      releaseYear: new Date(),
      players: request.players,
      expansions: request.expansions ?? null,
      publisher: publisher ?? null,
      type: request.type,
      isDeleted: false
    });
    if (gameOrError.isFailure) {
      return left(Result.fail<Game>(gameOrError.getErrorValue().toString())) as CreateGameResponse;
    }

    try {
      await this.gameRepo.save(gameOrError.getValue());

      return right(Result.ok<Game>(gameOrError.getValue()));
    } catch (err) {
      return left(new AppError.UnexpectedError(err)) as CreateGameResponse;
    }
  }
}
