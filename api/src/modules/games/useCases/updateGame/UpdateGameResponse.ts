import { Either, Result } from '../../../../shared/core/Result';

import { AppError } from '../../../../shared/core/AppError';
import { CreateGameErrors } from './UpdateGameErrors';

export type CreateGameResponse = Either<
  | CreateGameErrors.GameAlreadyExistsError
  | CreateGameErrors.GameNameAlreadyTakenError
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>;
