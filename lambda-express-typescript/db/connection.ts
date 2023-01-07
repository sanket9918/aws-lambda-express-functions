//@ts-nocheck

import { Sequelize } from "sequelize-typescript";
import { Hobby } from "../app/model/Hobby";
import { User } from "../app/model/User";
import { config } from "../config/config.validator";

let sequelizeInstance: Sequelize;
async function getDBConnection() {
    const sequelize = new Sequelize({
        dialect: "postgres",
        host: config.SEQUELIZE_DB_HOST,
        username: config.SEQUELIZE_DB_USERNAME,
        password: config.SEQUELIZE_DB_PASSWORD,
        database: config.SEQUELIZE_DB_DATABASE,
        logging: false,
        models: [User, Hobby],
        pool: {
            max: 2,
            /*
             * Set this value to 0 so connection pool eviction logic eventually cleans up all connections
             * in the event of a Lambda function timeout.
             */
            min: 0,
            /*
             * Set this value to 0 so connections are eligible for cleanup immediately after they're
             * returned to the pool.
             */
            idle: 0,
            // Choose a small enough value that fails fast if a connection takes too long to be established.
            acquire: 3000,
            /*
             * Ensures the connection pool attempts to be cleaned up automatically on the next Lambda
             * function invocation, if the previous invocation timed out.
             */
            evict: 100,
        },
    });
    await sequelize.sync();
    return sequelize;
}

export async function getDBInstance() {
    if (!sequelizeInstance) {
        sequelizeInstance = await getDBConnection();
        console.log("Database connectivity achieved");
    } else {
        sequelizeInstance.connectionManager.initPools();
        if (
            sequelizeInstance.connectionManager.hasOwnProperty("getConnection")
        ) {
            delete sequelizeInstance.connectionManager.getConnection;
        }
        console.log("Database already connected");
    }
    return sequelizeInstance;
}

export async function closeDBInstance() {
    return await sequelizeInstance.connectionManager.close();
}
