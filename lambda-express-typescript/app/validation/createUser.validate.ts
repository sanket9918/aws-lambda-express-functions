export const userCreateValidate = {
    type: "object",
    properties: {
        body: {
            type: "object",
            properties: {
                name: { type: "string" },
                age: { type: "number" },
                hobby: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            name: { type: "string" },
                        },
                        required: ["name"],
                    },
                },
            },
            required: ["name", "age"],
        },
    },
    required: ["body"],
};
