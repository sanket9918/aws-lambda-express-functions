import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { IValidationError } from "./validationError";

export const validate: RequestHandler = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors: IValidationError[] = [];
    errors.array().map((err) =>
        extractedErrors.push({
            [err.param]: err.msg,
        }),
    );
    console.log(extractedErrors.length);
    return res.status(422).json({
        errors: extractedErrors,
    });
};
