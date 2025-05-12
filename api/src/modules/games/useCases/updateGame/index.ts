import { gameRepo } from '../../repos';
import { UpdateGameController } from './UpdateGameController';
import { UpdateGameUseCase } from './UpdateGame';

const updateGameUseCase = new UpdateGameUseCase(gameRepo);
const updateGameController = new UpdateGameController(updateGameUseCase);

export { updateGameUseCase, updateGameController };
