import { param } from "express-validator";
export const getSingleUserValidate = () => {
    return [param("id").isUUID()];
};
