import { CreateGameController } from './CreateGameController';
import { CreateGameUseCase } from './CreateGameUseCase';

// import { userRepo } from '../../repos';
// const createGameUseCase = new CreateGameUseCase(userRepo);
const createGameUseCase = new CreateGameUseCase();
const createGameController = new CreateGameController(createGameUseCase);

export { createGameUseCase, createGameController };
