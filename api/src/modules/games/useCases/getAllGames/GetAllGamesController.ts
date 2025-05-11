import { BaseController } from '../../../../shared/infra/http/models/BaseController';
import * as express from 'express';
import { GetAllGamesUseCase } from './GetAllGamesUseCase';
import { GameMap } from '../../mappers/gameMap';
import { GetAllGamesResponseDTO } from './GetAllGamesResponseDTO';

export class GetAllGamesController extends BaseController {
  private useCase: GetAllGamesUseCase;

  constructor(useCase: GetAllGamesUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: express.Request, res: express.Response): Promise<any> {
    try {
      const result = await this.useCase.execute();
      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          default:
            return this.fail(res, error.getErrorValue().message);
        }
      } else {
        const games = result.value.getValue();
        const mappedGame = games.map(game => GameMap.toDTO(game));
        return this.ok<GetAllGamesResponseDTO>(res, { games: mappedGame });
      }
    } catch (err) {
      return this.fail(res, err as string);
    }
  }
}
