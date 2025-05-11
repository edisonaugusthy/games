import express from "express";
import gameRoute from "../../../../modules/games/infra/http/routes";
const v1Router = express.Router();

v1Router.get("/", (req, res) => {
  return res.json({ message: "Yo! we're up" });
});
v1Router.use("/game", gameRoute);

export { v1Router };
