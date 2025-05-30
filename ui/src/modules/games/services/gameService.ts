import { left, right } from '../../../shared/core/Either';
import { Result } from '../../../shared/core/Result';
import { APIResponse } from '../../../shared/infra/services/APIResponse';
import { BaseAPI } from '../../../shared/infra/services/BaseAPI';
import { Game } from '../models/Game';

export interface IGameService {
  getAllGames(): Promise<Game[]>;
  createGame(game: Partial<Game>): Promise<APIResponse<void>>;
  deleteGameById(game: Game): Promise<APIResponse<void>>;
  updateGame(game: Game): Promise<APIResponse<void>>;
}

export class GameService extends BaseAPI implements IGameService {
  async getAllGames(): Promise<Game[]> {
    const response = await this.get('/game');
    return response.data as Game[];
  }

  async createGame(game: Partial<Game>): Promise<APIResponse<void>> {
    try {
      await this.post('/game', game);
      return right(Result.ok<void>());
    } catch (err: any) {
      return left(err.response ? err.response.data.message : 'Connection failed');
    }
  }

  async updateGame(game: Game): Promise<APIResponse<void>> {
    try {
      await this.put('/game', game);
      return right(Result.ok<void>());
    } catch (err: any) {
      return left(err.response ? err.response.data.message : 'Connection failed');
    }
  }

  async deleteGameById(game: Game): Promise<APIResponse<void>> {
    try {
      await this.delete(`/game/${game.gameId}`);
      return right(Result.ok<void>());
    } catch (err: any) {
      return left(err.response ? err.response.data.message : 'Connection failed');
    }
  }
}
