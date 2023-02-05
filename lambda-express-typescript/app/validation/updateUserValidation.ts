export const userUpdateValidate = {
    type: "object",
    properties: {
        body: {
            type: "object",
            properties: {
                name: { type: "string" },
                age: { type: "number" },
            },
            required: ["name", "age"],
        },
        pathParameters: {
            type: "object",
            properties: {
                id: { type: "string", format: "uuid" },
            },
            required: ["id"],
        },
    },
    required: ["body", "pathParameters"],
};
