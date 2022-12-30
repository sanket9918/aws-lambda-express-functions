import * as dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import { Sequelize } from "sequelize-typescript";

import serverless from "serverless-http";
import connection from "../db/connection";
export const app = express();
app.use(express.json());

let sequelize: Sequelize;

app.get("/api/info", async (req: Request, res: Response) => {
  if (!sequelize) {
    sequelize = await connection.sync();
    console.log("Database connectivity achieved");
  } else {
    console.log("Database already connected");
  }
  res.send({
    owner: "Sanket from serverless",
    version: "1.0",
  });
});

export const serverApp = serverless(app);
