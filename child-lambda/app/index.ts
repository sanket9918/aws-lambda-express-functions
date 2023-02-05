import compression from "compression";
import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
dotenv.config();

import serverless from "serverless-http";
import { bookRouter } from "./controller/book.controller";

export const app = express();
app.use(compression());
app.use(express.json());
app.get("/", async (req: Request, res: Response) => {
  res.send({
    owner: "Sanket from serverless child app",
    version: "1.0",
  });
});

app.use("/books", bookRouter);

export const serverApp = serverless(app);
