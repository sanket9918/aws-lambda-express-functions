export const getUsersValidate = {
    type: "object",
    properties: {
        pathParameters: {
            type: "object",
            properties: {
                page: { type: "string" },
            },
            required: ["page"],
        },
    },
    required: ["pathParameters"],
};
