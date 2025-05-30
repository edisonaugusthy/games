import { Either, Result } from '../../../../shared/core/Result';

import { AppError } from '../../../../shared/core/AppError';
import { CreateGamesErrors } from './CreateGamesErrors';
import { Game } from '../../domain/game';

export type CreateGamesResponse = Either<
  | CreateGamesErrors.GameAlreadyExistsError
  | CreateGamesErrors.GameNameAlreadyTakenError
  | AppError.UnexpectedError
  | Result<any>,
  Result<Game[]>
>;
