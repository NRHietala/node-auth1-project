const express = require("express");
const User = require("../users/users-model");

const router = express.Router();

router.post("/register", (req, res) => {
  const { username, password } = req.body;
});

router.post("/login", (req, res) => {});

module.exports = router;
