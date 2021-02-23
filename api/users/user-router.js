const express = require("express");
const User = require("./users-model");
const protected = require("../middleware/auth.middleware");
const router = express.Router();

router.get("/", protected, async (req, res) => {
  try {
    const data = await User.find();
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
