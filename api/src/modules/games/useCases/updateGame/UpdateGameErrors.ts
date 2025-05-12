import { UseCaseError } from '../../../../shared/core/UseCaseError';
import { Result } from '../../../../shared/core/Result';

export namespace EditGameErrors {
  export class GameNotFoundError extends Result<UseCaseError> {
    constructor(name: string) {
      super(false, {
        message: `The game ${name} not exists`
      } as UseCaseError);
    }
  }
}
