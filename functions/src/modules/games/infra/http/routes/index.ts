// import { createRouter } from '../shared/utils/router.js';
// import { v1Router } from './v1/index.js';
import express from "express";
import { createGameController } from "../../../useCases/createGame";
import { deleteGameController } from "../../../useCases/deleteGame";

const gameRoute = express.Router();
gameRoute.post("/", (req, res) => createGameController.execute(req, res));
gameRoute.delete("/:gameId", (req, res) =>
  deleteGameController.execute(req, res)
);

export default gameRoute;
