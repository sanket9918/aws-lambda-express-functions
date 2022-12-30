import { Sequelize } from "sequelize-typescript";
import { config } from "../config/config.validator";

const connection = new Sequelize({
  dialect: "postgres",
  host: config.SEQUELIZE_DB_HOST,
  username: config.SEQUELIZE_DB_USERNAME,
  password: config.SEQUELIZE_DB_PASSWORD,
  database: config.SEQUELIZE_DB_DATABASE,
  logging: false,
});

export default connection;
