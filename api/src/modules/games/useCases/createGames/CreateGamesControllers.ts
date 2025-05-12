import { CreateGamesUseCase } from './CreateGames';
import { CreateGamesDTO } from './CreateGamesDTO';
import { BaseController } from '../../../../shared/infra/http/models/BaseController';
import { TextUtils } from '../../../../shared/utils/TextUtils';

import * as express from 'express';
import { CreateGamesErrors } from './CreateGamesErrors';

export class CreateGamesController extends BaseController {
  private useCase: CreateGamesUseCase;

  constructor(useCase: CreateGamesUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: express.Request, res: express.Response): Promise<any> {
    let dto: CreateGamesDTO[] = req.body as CreateGamesDTO[];
    if (dto?.length > 0) {
      const sanitizedValues = dto.map(game => {
        return {
          ...game,
          name: TextUtils.sanitize(game.name),
          publisher: TextUtils.sanitize(game.publisher)
        };
      });

      try {
        const result = await this.useCase.execute(sanitizedValues);

        if (result.isLeft()) {
          const error = result.value;
          switch (error.constructor) {
            case CreateGamesErrors.GameAlreadyExistsError:
              return this.conflict(res, error.getErrorValue().message);
            case CreateGamesErrors.GameNameAlreadyTakenError:
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
    } else {
      return this.fail(res, 'Please provide valid data');
    }
  }
}
