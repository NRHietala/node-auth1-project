const express = require("express");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const server = express();

server.use(express.json());
server.use(
  session({
    name: "banana",
    secret: "keep it secret, keep it safe",
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false,
      httpOnly: true,
    },
    resave: false,
    saveUnitialized: false,

    store: new KnexSessionStore({
      knex: require("../data/dbConfig"),
      tablename: "sessions",
      sidfieldname: "sid",
      createtable: true,
      clearInterval: 1000 * 60 * 60,
    }),
  })
);

const userRouter = require("./users/user-router");
const authRouter = require("./auth/auth-router");

server.use("/api/users", userRouter);
server.use("/api/auth", authRouter);

server.get("/", (_, res) => {
  res.send("Is your API running? You should go catch it! 🏃‍♂️");
});

server.use("*", (_, res) => {
  res.status(404).json({ message: "404: Resource not found" });
});

module.exports = server;
