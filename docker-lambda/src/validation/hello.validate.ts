export const helloValidate = {
  type: "object",

  properties: {
    name: { type: "string" },
  },
  required: ["name"],
};
