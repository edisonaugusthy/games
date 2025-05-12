import { Either, Result } from '../../../../shared/core/Result';

import { AppError } from '../../../../shared/core/AppError';
import { CreateGameErrors } from './CreateGamesErrors';
import { Game } from '../../domain/game';

export type CreateGamesResponse = Either<
  | CreateGameErrors.GameAlreadyExistsError
  | CreateGameErrors.GameNameAlreadyTakenError
  | AppError.UnexpectedError
  | Result<any>,
  Result<Game[]>
>;
