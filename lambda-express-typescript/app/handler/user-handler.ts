import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import jsonBodyParser from "@middy/http-json-body-parser";
import {
    createUser,
    deleteUser,
    getASingleUser,
    getUsers,
    updateUser,
} from "../service/user-service";
import validator from "@middy/validator";
import { getSingleUserValidate } from "../validation/getSingleUser.validate";
import { transpileSchema } from "@middy/validator/transpile";
import { validationErrorFormatter } from "../validation/validate";
import { getUsersValidate } from "../validation/getUsersQuery.validate";
import { userCreateValidate } from "../validation/createUser.validate";
import { userUpdateValidate } from "../validation/updateUserValidation";

export const getUsersHandler = middy()
    .use(jsonBodyParser())
    .use(
        validator({
            eventSchema: transpileSchema(getUsersValidate),
        }),
    )
    .use({
        onError: (request) => validationErrorFormatter(request),
    })
    .use(httpErrorHandler())
    .handler(getUsers);

export const getUserByIdHandler = middy()
    .use(jsonBodyParser())
    .use(
        validator({
            eventSchema: transpileSchema(getSingleUserValidate),
        }),
    )
    .use({
        onError: (request) => validationErrorFormatter(request),
    })
    .use(httpErrorHandler())
    .handler(getASingleUser);

export const createUserHandler = middy()
    .use(jsonBodyParser())
    .use(
        validator({
            eventSchema: transpileSchema(userCreateValidate),
        }),
    )
    .use({
        onError: (request) => validationErrorFormatter(request),
    })
    .use(httpErrorHandler())
    .handler(createUser);

export const updateUserHandler = middy()
    .use(jsonBodyParser())
    .use(
        validator({
            eventSchema: transpileSchema(userUpdateValidate),
        }),
    )
    .use({
        onError: (request) => validationErrorFormatter(request),
    })
    .use(httpErrorHandler())
    .handler(updateUser);
export const deleteUserHandler = middy()
    .use(jsonBodyParser())
    .use(
        validator({
            eventSchema: transpileSchema(getSingleUserValidate),
        }),
    )
    .use({
        onError: (request) => validationErrorFormatter(request),
    })
    .use(httpErrorHandler())
    .handler(deleteUser);
