export const getSingleUserValidate = {
    type: "object",
    properties: {
        pathParameters: {
            type: "object",
            properties: {
                id: { type: "string", format: "uuid" },
            },
            required: ["id"],
        },
    },
    required: ["pathParameters"],
};
