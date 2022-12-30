import express, { Request, Response } from "express";

import serverless from "serverless-http";
const app = express();
app.use(express.json());

app.get("/api/info", (req: Request, res: Response) => {
  res.send({
    owner: "Sanket from serverless",
    version: "1.0",
  });
});

export const serverApp = serverless(app);
