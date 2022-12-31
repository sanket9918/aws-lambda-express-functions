import compression from "compression";
import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
dotenv.config();

import serverless from "serverless-http";
import { users } from "./controller/user.controller";

export const app = express();
app.use(compression());
app.use(express.json());
app.get("/api/info", async (req: Request, res: Response) => {
  res.send({
    owner: "Sanket from serverless",
    version: "1.0",
  });
});

app.use("/users", users);

export const serverApp = serverless(app);
