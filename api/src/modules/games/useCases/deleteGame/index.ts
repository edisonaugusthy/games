import { DeleteGameController } from './DeleteGameController';
import { DeleteGameUseCase } from './DeleteGame';

// import { gameRepo } from '../../repos';
// const createGameUseCase = new CreateGameUseCase(gameRepo);
const deleteGameUseCase = new DeleteGameUseCase();
const deleteGameController = new DeleteGameController(deleteGameUseCase);

export { deleteGameUseCase, deleteGameController };
