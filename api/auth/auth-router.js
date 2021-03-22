const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../users/users-model");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashed = bcrypt.hashSync(password, 10);

    const userData = await User.add({ username, password: hashed });
    res.status(201).json(userData);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const allegedUser = await User.findBy({ username }).first();
    if (allegedUser && bcrypt.compareSync(password, allegedUser.password)) {
      req.session.user = allegedUser;
      res.json("welcome back!");
    } else {
      res.status(401).json("Invalid Credentials");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get("/logout", (req, res) => {
  if (req.session && req.session.user) {
    req.session.destroy(err => {
      if (err) {
        res.json("No leaving!");
      } else {
        res.json("Have a good one!");
      }
    });
  } else {
    res.end();
  }
});

module.exports = router;
