import { Router } from "express";
import {
    createUser,
    deleteUser,
    getASingleUser,
    getUsers,
    updateUser,
} from "../service/user.service";
import { userCreateValidate } from "../validation/createUser.validate";
import { getSingleUserValidate } from "../validation/getSingleUser.validate";
import { getUsersValidate } from "../validation/getUsersQuery.validate";
import { validate } from "../validation/validate";

export const users = Router();

users.get("/users", getUsersValidate(), validate, getUsers);
users.post("/user", userCreateValidate(), validate, createUser);
users.get("/user/:id", getSingleUserValidate(), validate, getASingleUser);
users.put("/user/:id", getSingleUserValidate(), validate, updateUser);
users.delete("/user/:id", getSingleUserValidate(), validate, deleteUser);
