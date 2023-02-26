import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { closeDBInstance, getDBInstance } from "../../db/connection";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import { Hobby } from "../model/Hobby";
import { User } from "../model/User";
import createError from "http-errors";

export const getUsers = async (
    event: APIGatewayProxyEvent,
    _context: Context,
) => {
    await getDBInstance();
    const page = event.pathParameters!.page;

    console.log(process.env.MESSAGE);

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
            raw: true,
            nest: true,
        });
        console.log("Details of all users fetched");

        return {
            data: users,
        };
    } catch (error) {
        console.log(error);
        // res.status(500).send(error);
    } finally {
        await closeDBInstance();
    }
};

export const getASingleUser = async (
    event: APIGatewayProxyEvent,
    _context: Context,
) => {
    await getDBInstance();
    const id = event.pathParameters!.id;
    if (!id) {
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
            return user.get({ plain: true });
        } else {
            return {
                message: "No record found",
            };
        }
    } catch (error) {
        console.log(error);
        throw new createError.InternalServerError();
    } finally {
        await closeDBInstance();
    }
};

export const createUser = async (
    event: APIGatewayProxyEvent,
    _context: Context,
) => {
    await getDBInstance();

    const newUser: User = event.body as unknown as User;
    console.log(newUser);

    if (!newUser) {
        return {
            message: "Request body empty",
        };
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
            return { message: "Create user successful" };
        } else {
            return { error: "User creation failed" };
        }
    } catch (error) {
        console.log(error);
        throw new createError.InternalServerError();
    } finally {
        await closeDBInstance();
    }
};

export const updateUser = async (
    event: APIGatewayProxyEvent,
    _context: Context,
) => {
    await getDBInstance();

    const id = event.pathParameters!.id;
    console.log(id);

    if (!id) {
        return {
            message: "Request body empty",
        };
    }
    const userUpdated: User = event.body as unknown as User;
    try {
        await User.update(userUpdated, {
            where: {
                id,
            },
        });

        return { message: "Update user successful" };
    } catch (error) {
        console.log(error);
        throw new createError.InternalServerError();
    } finally {
        await closeDBInstance();
    }
};

export const deleteUser = async (
    event: APIGatewayProxyEvent,
    _context: Context,
) => {
    await getDBInstance();

    const id = event.pathParameters!.id;
    if (!id) {
        return {
            message: "Request body empty",
        };
    }
    try {
        const deleteUser = await User.destroy({
            where: {
                id,
            },
        });
        if (deleteUser < 1) {
            return { message: "No item to be deleted" };
        } else {
            return { message: "Delete successful" };
        }
    } catch (error) {
        throw new createError.InternalServerError();
    } finally {
        await closeDBInstance();
    }
};

// To invoke a remote lambda
const lambdaConfig = {
    region: "us-east-1",
    endpoint: "http://localhost:4000",
};
const params = {
    FunctionName: "aws-child-lambda-dev-getBooks",
    LogType: "Tail",
    Payload: Buffer.from(
        JSON.stringify({
            samplePayload: 123,
        }),
    ),
};

interface IResponseBody {
    [key: string]: any;
}
export const invokeAnotherLambda = async (
    event: APIGatewayProxyEvent,
    _context: Context,
) => {
    try {
        const lambda = new LambdaClient(lambdaConfig);
        let finalArray: IResponseBody = [];
        const data = await lambda.send(new InvokeCommand(params));
        if (data.Payload) {
            const response = JSON.parse(Buffer.from(data.Payload!).toString());

            for (let items of response) {
                finalArray.push(items.dataValues);
            }

            return {
                data: finalArray,
            };
        } else {
            return {
                statusCode: 500,
                body: "Something went wrong",
            };
        }
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                message: "Something went wrong",
                data: {},
            }),
        };
    }
};
