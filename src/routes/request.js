const express = require("express");
const requestRouter = express.Router();

const { userAuth } = require("../middleware/auth");

requestRouter.post("/sendconnection", userAuth, (req, res) => {
  try {
    res.send("connection successfully with " + req.user.firstName);
  } catch (err) {
    res.status(404).send("ERR : " + err.message);
  }
});

module.exports = { requestRouter };
