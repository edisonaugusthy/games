import { left, right } from '../../../shared/core/Either';
import { Result } from '../../../shared/core/Result';
import { APIResponse } from '../../../shared/infra/services/APIResponse';
import { BaseAPI } from '../../../shared/infra/services/BaseAPI';
import { Game } from '../models/Game';

export interface IGameService {
  getAllGames(): Promise<Game[]>;
  createGame(game: Game): Promise<APIResponse<void>>;
}

export class GameService extends BaseAPI implements IGameService {
  async getAllGames(): Promise<Game[]> {
    const response = await this.get('/game');
    return response.data as Game[];
  }

  async createGame(game: Game): Promise<APIResponse<void>> {
    try {
      await this.post('/game', game);
      return right(Result.ok<void>());
    } catch (err: any) {
      return left(err.response ? err.response.data.message : 'Connection failed');
    }
  }
}
