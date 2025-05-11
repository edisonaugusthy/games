import { UpdateGameUseCase } from './UpdateGame';
import { UpdateGameDTO } from './UpdateGameDTO';
import { BaseController } from '../../../../shared/infra/http/models/BaseController';
import { TextUtils } from '../../../../shared/utils/TextUtils';
import * as express from 'express';
import { EditGameErrors } from './UpdateGameErrors';

export class UpdateGameController extends BaseController {
  private useCase: UpdateGameUseCase;

  constructor(useCase: UpdateGameUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: express.Request, res: express.Response): Promise<any> {
    let dto: UpdateGameDTO = req.body as UpdateGameDTO;

    const sanitizedInputs = {
      ...dto,
      name: TextUtils.sanitize(dto.name),
      publisher: TextUtils.sanitize(dto.publisher)
    };

    try {
      const result = await this.useCase.execute(sanitizedInputs);

      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case EditGameErrors.GameNotFoundError:
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
