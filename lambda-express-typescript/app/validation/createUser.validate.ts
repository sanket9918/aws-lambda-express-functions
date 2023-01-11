import { body } from "express-validator";
export const userCreateValidate = () => {
    return [
        body("name").notEmpty().isString(),
        body("age").notEmpty().isNumeric(),
    ];
};
