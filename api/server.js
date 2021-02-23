const express = require("express");
const server = express();

server.use(express.json());

const userRouter = require("./users/user-router");
const authRouter = require("./auth/auth-router");

server.use("/api/users", userRouter);
server.use("/api", authRouter);

server.get("/", (_, res) => {
  res.send("Is your API running? You should go catch it! 🏃‍♂️");
});

server.use("*", (_, res) => {
  res.status(404).json({ message: "404: Resource not found" });
});

module.exports = server;
