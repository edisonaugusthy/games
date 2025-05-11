import { DeleteUserController } from './DeleteGameController';
import { DeleteGameUseCase } from './DeleteGameUseCase';

// import { userRepo } from '../../repos';
// const createGameUseCase = new CreateGameUseCase(userRepo);
const deleteGameUseCase = new DeleteGameUseCase();
const deleteGameController = new DeleteUserController(deleteGameUseCase);

export { deleteGameUseCase, deleteGameController };
