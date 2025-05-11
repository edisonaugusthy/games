import { DeleteUserController } from "./DeleteGameController";
import { DeleteGameUseCase } from "./DeleteGameUseCase";

// import { gameRepo } from '../../repos';
// const createGameUseCase = new CreateGameUseCase(gameRepo);
const deleteGameUseCase = new DeleteGameUseCase();
const deleteGameController = new DeleteUserController(deleteGameUseCase);

export { deleteGameUseCase, deleteGameController };
