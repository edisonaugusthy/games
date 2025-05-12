import { CreateGamesController } from './CreateGamesControllers';
import { CreateGamesUseCase } from './CreateGames';

import { gameRepo } from '../../repos';
const createGamesUseCase = new CreateGamesUseCase(gameRepo);
const createGamesController = new CreateGamesController(createGamesUseCase);

export { createGamesUseCase, createGamesController };
