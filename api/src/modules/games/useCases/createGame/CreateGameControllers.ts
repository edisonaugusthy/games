import { CreateGameUseCase } from './CreateGame';
import { CreateGameDTO } from './CreateGameDTO';
import { BaseController } from '../../../../shared/infra/http/models/BaseController';
import { TextUtils } from '../../../../shared/utils/TextUtils';

import * as express from 'express';
import { CreateGameErrors } from './CreateGameErrors';

export class CreateGameController extends BaseController {
  private useCase: CreateGameUseCase;

  constructor(useCase: CreateGameUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: express.Request, res: express.Response): Promise<any> {
    let dto: CreateGameDTO = req.body as CreateGameDTO;

    const sanitizedValues = {
      ...dto,
      name: TextUtils.sanitize(dto.name),
      publisher: TextUtils.sanitize(dto.publisher)
    };

    try {
      const result = await this.useCase.execute(sanitizedValues);

      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case CreateGameErrors.GameAlreadyExistsError:
            return this.conflict(res, error.getErrorValue().message);
          case CreateGameErrors.GameNameAlreadyTakenError:
            return this.conflict(res, error.getErrorValue().message);
          default:
            return this.fail(res, error.getValue());
        }
      } else {
        return this.ok(res);
      }
    } catch (err) {
      return this.fail(res, err as string);
    }
  }
}
