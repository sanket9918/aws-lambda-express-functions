import compression from "compression";
import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import { Lambda } from "aws-sdk";
dotenv.config();

import serverless from "serverless-http";
import { users } from "./controller/user.controller";
import axios from "axios";
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

//Through API gateway using the http endpoint of the service.
app.post("/getBooksWithoutConn", async (req, res) => {
    let data = axios.post("http://localhost:4000/books/getBooksExpress");
    res.send((await data).data);
});

//Through direct lambda connection
let lambda = new Lambda({
    region: "us-east-1",
    endpoint: "http://localhost:4001",
});
app.post("/api/getBooks", async (req, res) => {
    let params = {
        FunctionName: "aws-child-lambda-dev-getBooks",
        Payload: JSON.stringify({
            someting: 123,
        }),
    };

    lambda.invoke(params, (err, data) => {
        if (err) {
            console.log(err);
            return;
        } else {
            let responseString = JSON.parse(data.Payload!.toString());
            let finalArray = [];
            for (let entry of responseString) {
                finalArray.push(entry.dataValues);
            }
            res.status(200).send({
                data: finalArray,
            });
            return;
        }
    });
});
app.post("/api/createBooks", async (req, res) => {
    let params = {
        FunctionName: "aws-child-lambda-dev-createBook",
        Payload: JSON.stringify({
            name: req.body.name,
            ISBN: req.body.ISBN,
        }),
    };

    lambda.invoke(params, (err, data) => {
        if (err) {
            console.log(err);
            return;
        } else {
            let responseString = JSON.parse(data.Payload!.toString());

            res.status(200).send({
                data: responseString.dataValues,
            });
            return;
        }
    });
});

export const serverApp = serverless(app);
