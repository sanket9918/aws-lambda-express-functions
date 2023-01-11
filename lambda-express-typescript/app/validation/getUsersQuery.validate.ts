import { query } from "express-validator";

export const getUsersValidate = () => {
    return [query("page").isNumeric()];
};
