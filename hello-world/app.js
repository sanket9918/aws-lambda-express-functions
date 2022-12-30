const express = require("express");
const serverless = require("serverless-http");
const app = express();

app.use(express.json());
app.get("/api/info", (req, res) => {
  res.send({
    owner: "Sanket",
    version: "1.0",
  });
});
app.get("/api/v2/info", (req, res) => {
  res.send({
    response: "This is the 2nd attempt at it",
  });
});
app.get("/api/v3/info", (req, res) => {
  res.send({
    response: "This is the 3rd attempt at it",
  });
});
app.listen(3000, () => console.log("Server running on 3000"));

module.exports.handler = serverless(app);
