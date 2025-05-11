import { CreateGameUseCase } from './CreateGameUseCase';
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

    dto = {
      name: TextUtils.sanitize(dto.name),
      publisher: TextUtils.sanitize(dto.publisher),
      ...req.body,
    };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case CreateGameErrors.GameAlreadyExistsError:
            return this.conflict(res, error.getErrorValue().message);
          case CreateGameErrors.GameNameAlreadyTakenError:
            return this.conflict(res, error.getErrorValue().message);
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
