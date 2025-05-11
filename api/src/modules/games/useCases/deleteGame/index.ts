import { DeleteGameController } from './DeleteGameController';
import { DeleteGameUseCase } from './DeleteGame';
import { gameRepo } from '../../repos';
const deleteGameUseCase = new DeleteGameUseCase(gameRepo);
const deleteGameController = new DeleteGameController(deleteGameUseCase);

export { deleteGameUseCase, deleteGameController };
