import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express, Request, Response } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SoftGames API",
      description: "API endpoints for a gaming services documented on swagger",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:5001/",
        description: "Local server",
      },
      {
        url: "<dev dev url here>",
        description: "Dev server",
      },
    ],
  },
  apis: ["../../api/v1.ts"],
};
const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api/v1/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}
export default swaggerDocs;
