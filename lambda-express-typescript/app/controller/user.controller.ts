import { Router } from "express";
import {
    createUser,
    deleteUser,
    getASingleUser,
    getUsers,
    updateUser,
} from "../service/user.service";

export const users = Router();

users.get("/users", getUsers);
users.post("/user", createUser);
users.get("/user/:id", getASingleUser);
users.put("/user/:id", updateUser);
users.delete("/user/:id", deleteUser);
