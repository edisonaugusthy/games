import { DeleteGameErrors } from './DeleteGameErrors';
import { BaseController } from '../../../../shared/infra/http/models/BaseController';
import * as express from 'express';
import { DeleteGameUseCase } from './DeleteGame';
import { DeleteGameDTO } from './DeleteGameDTO';

export class DeleteGameController extends BaseController {
  private useCase: DeleteGameUseCase;

  constructor(useCase: DeleteGameUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: express.Request, res: express.Response): Promise<any> {
    const dto: DeleteGameDTO = { gameId: req.params.gameId };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case DeleteGameErrors.GameNotFoundError:
            return this.notFound(res, error.getErrorValue().message);
          default:
            return this.fail(res, error.getErrorValue().message);
        }
      } else {
        return this.ok(res);
      }
    } catch (err) {
      return this.fail(res, err as string);
    }
  }
}
