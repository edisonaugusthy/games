import { GetAllGamesController } from './GetAllGamesController';
import { GetAllGamesUseCase } from './GetAllGames';
import { gameRepo } from '../../repos';

const getAllGameUseCase = new GetAllGamesUseCase(gameRepo);
const getAllGameController = new GetAllGamesController(getAllGameUseCase);

export { getAllGameUseCase, getAllGameController };
