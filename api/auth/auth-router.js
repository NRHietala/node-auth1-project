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

router.post("/login", (req, res) => {});

module.exports = router;
