import { Router } from "express";
import { createBookExpress, getBooksExpress } from "../service/book";

export const bookRouter = Router();

bookRouter.post("/createBookExpress", createBookExpress);
bookRouter.post("/getBooksExpress", getBooksExpress);
