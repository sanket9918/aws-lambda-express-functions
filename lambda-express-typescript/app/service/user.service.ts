import { RequestHandler } from "express";
import { Sequelize } from "sequelize";
import { getDBConnection } from "../../db/connection";
import { Hobby } from "../model/Hobby";
import { User } from "../model/User";

let sequelize: Sequelize;

export const getUsers: RequestHandler = async (req, res) => {
    if (!sequelize) {
        sequelize = await getDBConnection();
        console.log("Database connectivity achieved");
    } else {
        sequelize.connectionManager.initPools();
        if (sequelize.connectionManager.hasOwnProperty("getConnection")) {
            delete sequelize.connectionManager.getConnection;
        }
        console.log("Database already connected");
    }

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
        await sequelize.connectionManager.close();
    }
};

export const getASingleUser: RequestHandler = async (req, res) => {
    console.log("Connection received");
    if (!sequelize) {
        sequelize = await getDBConnection();
        console.log("Database connectivity achieved");
    } else {
        sequelize.connectionManager.initPools();
        if (sequelize.connectionManager.hasOwnProperty("getConnection")) {
            delete sequelize.connectionManager.getConnection;
        }
        console.log("Database already connected");
    }

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
        await sequelize.connectionManager.close();
    }
};

export const createUser: RequestHandler = async (req, res) => {
    if (!sequelize) {
        sequelize = await getDBConnection();
        console.log("Database connectivity achieved");
    } else {
        sequelize.connectionManager.initPools();
        if (sequelize.connectionManager.hasOwnProperty("getConnection")) {
            delete sequelize.connectionManager.getConnection;
        }
        console.log("Database already connected");
    }

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
        await sequelize.connectionManager.close();
    }
};

export const updateUser: RequestHandler = async (req, res) => {
    if (!sequelize) {
        sequelize = await getDBConnection();
        console.log("Database connectivity achieved");
    } else {
        sequelize.connectionManager.initPools();
        if (sequelize.connectionManager.hasOwnProperty("getConnection")) {
            delete sequelize.connectionManager.getConnection;
        }
        console.log("Database already connected");
    }

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
        await sequelize.connectionManager.close();
    }
};

export const deleteUser: RequestHandler = async (req, res) => {
    if (!sequelize) {
        sequelize = await getDBConnection();
        console.log("Database connectivity achieved");
    } else {
        sequelize.connectionManager.initPools();
        if (sequelize.connectionManager.hasOwnProperty("getConnection")) {
            delete sequelize.connectionManager.getConnection;
        }
        console.log("Database already connected");
    }

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
        await sequelize.connectionManager.close();
    }
};
