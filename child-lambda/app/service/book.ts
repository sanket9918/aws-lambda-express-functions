import { RequestHandler, Response } from "express";
import { getDBInstance, closeDBInstance } from "../db/connection";
import { Book } from "../model/Book.model";

export const createBook = async (event: any, ctx: any) => {
  await getDBInstance();

  const newBook = event;
  if (!newBook) {
    console.log(ctx.fail("No proper data"));

    // res.status(500).send({ error: "Request body is empty" });
  }
  try {
    const users = await Book.create(newBook);
    if (users) {
      return users;
      // res.status(200).send({ message: "Create book successful" });
    } else {
      // res.status(400).send({ error: "User book failed" });
    }
  } catch (error) {
    console.log(error);
  } finally {
    await closeDBInstance();
  }
};

export const getBooks = async (event: any, ctx: any) => {
  await getDBInstance();
  // const { page } = req.query;

  let pageQuery;

  if (!pageQuery || pageQuery === 0) {
    pageQuery = 1;
  }
  const limit = 5;
  const skip = (pageQuery - 1) * limit;
  try {
    const users = await Book.findAll({
      // offset: skip,
      // limit,
    });

    // res.status(200).send(users);
    return users;
  } catch (error) {
    console.log(error);
    // res.status(500).send(error);
  } finally {
    await closeDBInstance();
  }
};

export const getBooksExpress: RequestHandler = async (req, res) => {
  await getDBInstance();
  // const { page } = req.query;

  let pageQuery;

  if (!pageQuery || pageQuery === 0) {
    pageQuery = 1;
  }
  const limit = 5;
  const skip = (pageQuery - 1) * limit;
  try {
    const users = await Book.findAll({
      // offset: skip,
      // limit,
    });

    res.status(200).send(users);
    // return users;
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  } finally {
    await closeDBInstance();
  }
};

export const createBookExpress: RequestHandler = async (req, res) => {
  await getDBInstance();

  const newBook = req.body;
  if (!newBook) {
    res.status(422).send({ error: "Request body is empty" });
  }
  try {
    const users = await Book.create(newBook);
    if (users) {
      res.status(200).send({ message: "Create book successful" });
    } else {
      res.status(400).send({ error: "User book failed" });
    }
  } catch (error) {
    console.log(error);
  } finally {
    await closeDBInstance();
  }
};
