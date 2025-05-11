import { UseCaseError } from '../../../../shared/core/UseCaseError';
import { Result } from '../../../../shared/core/Result';

export namespace CreateGameErrors {
  export class GameAlreadyExistsError extends Result<UseCaseError> {
    constructor(name: string) {
      super(false, {
        message: `The game ${name} already exists`,
      } as UseCaseError);
    }
  }

  export class GameNameAlreadyTakenError extends Result<UseCaseError> {
    constructor(name: string) {
      super(false, {
        message: `The name ${name} was already taken`,
      } as UseCaseError);
    }
  }
}
