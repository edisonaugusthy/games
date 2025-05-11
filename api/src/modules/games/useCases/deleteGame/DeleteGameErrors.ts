import { UseCaseError } from '../../../../shared/core/UseCaseError';
import { Result } from '../../../../shared/core/Result';

export namespace DeleteGameErrors {
  export class GameNotFoundError extends Result<UseCaseError> {
    constructor(name: string) {
      super(false, {
        message: `The name ${name} doesn't exists`,
      } as UseCaseError);
    }
  }
}
