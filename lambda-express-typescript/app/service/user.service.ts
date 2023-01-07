import { RequestHandler } from "express";
import { closeDBInstance, getDBInstance } from "../../db/connection";
import { Hobby } from "../model/Hobby";
import { User } from "../model/User";

export const getUsers: RequestHandler = async (req, res) => {
    await getDBInstance();
    const { page } = req.query;

    let pageQuery = page as unknown as number;
    if (pageQuery === 0) {
        pageQuery = 1;
    }
    const limit = 5;
    const skip = (pageQuery - 1) * limit;
    try {
        const users = await User.findAll({
            offset: skip,
            limit,
            include: [
                {
                    model: Hobby,
                },
            ],
        });
        console.log("Details of all users fetched");
        res.status(200).send(users);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    } finally {
        await closeDBInstance();
    }
};

export const getASingleUser: RequestHandler = async (req, res) => {
    await getDBInstance();
    const id = req.params.id;
    if (!id) {
        res.status(500).send({ error: "Request body is empty" });
    }
    try {
        const user = await User.findByPk(id, {
            include: [
                {
                    model: Hobby,
                },
            ],
        });
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send({ error: "No such user found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    } finally {
        await closeDBInstance();
    }
};

export const createUser: RequestHandler = async (req, res) => {
    await getDBInstance();

    const newUser = req.body;
    if (!newUser) {
        res.status(500).send({ error: "Request body is empty" });
    }
    try {
        const users = await User.create(newUser, {
            include: [
                {
                    model: Hobby,
                },
            ],
        });
        if (users) {
            res.status(200).send({ message: "Create user successful" });
        } else {
            res.status(400).send({ error: "User creation failed" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    } finally {
        await closeDBInstance();
    }
};

export const updateUser: RequestHandler = async (req, res) => {
    await getDBInstance();

    const id = req.params.id;
    if (!id) {
        res.status(500).send({ error: "ID is empty" });
    }
    try {
        await User.update(req.body, {
            where: {
                id,
            },
        });

        res.status(200).send({ message: "User successfully updated " });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    } finally {
        await closeDBInstance();
    }
};

export const deleteUser: RequestHandler = async (req, res) => {
    await getDBInstance();

    const id = req.params.id;
    if (!id) {
        res.status(500).send({ error: "ID is empty" });
    }
    try {
        const deleteUser = await User.destroy({
            where: {
                id,
            },
        });
        if (deleteUser < 1) {
            res.status(404).send({ error: "No such record found to delete" });
        } else {
            res.status(200).send({ message: "User successfully deleted " });
        }
    } catch (error) {
        res.status(500).send(error);
    } finally {
        await closeDBInstance();
    }
};
