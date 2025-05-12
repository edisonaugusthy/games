import express from 'express';
import { createGamesController } from '../../../useCases/createGames';
import { deleteGameController } from '../../../useCases/deleteGame';
import { getAllGameController } from '../../../useCases/getAllGames';
import { updateGameController } from '../../../useCases/updateGame';

const gameRoute = express.Router();
gameRoute.post('/', (req, res) => createGamesController.execute(req, res));
gameRoute.delete('/:gameId', (req, res) => deleteGameController.execute(req, res));
gameRoute.get('/', (req, res) => getAllGameController.execute(req, res));
gameRoute.put('/', (req, res) => updateGameController.execute(req, res));

export default gameRoute;
