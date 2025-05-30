import { UseCaseError } from '../../../../shared/core/UseCaseError';
import { Result } from '../../../../shared/core/Result';

export namespace DeleteGameErrors {
  export class GameNotFoundError extends Result<UseCaseError> {
    constructor(id: string) {
      super(false, {
        message: `The id ${id} doesn't exists`
      } as UseCaseError);
    }
  }
}
