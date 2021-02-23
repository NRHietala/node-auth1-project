const express = require("express");
const User = require("./users-model");
const router = express.Router();

const restricted = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json("You shall not pass!");
  }
};

router.get("/", restricted, async (req, res) => {
  try {
    const data = await User.find();
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
