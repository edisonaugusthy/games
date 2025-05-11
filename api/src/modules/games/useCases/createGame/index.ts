import { CreateGameController } from "./CreateGameController";
import { CreateGameUseCase } from "./CreateGameUseCase";

import { gameRepo } from "../../repos";
const createGameUseCase = new CreateGameUseCase(gameRepo);
const createGameController = new CreateGameController(createGameUseCase);

export { createGameUseCase, createGameController };
