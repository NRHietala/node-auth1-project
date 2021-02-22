const express = require("express");
const server = express();

server.use(express.json());

const loginRouter = require("./login/login-router");
const registerRouter = require("./login/login-router");
const userRouter = require("./users/user-router");

server.use("/api/login", loginRouter);
server.use("/api/register", registerRouter);
server.use("/api/users", userRouter);

server.get("/", (_, res) => {
  res.send("Is your API running? You should go catch it! 🏃‍♂️");
});

server.use("*", (_, res) => {
  res.status(404).json({ message: "404: Resource not found" });
});

module.exports = server;
