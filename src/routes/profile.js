const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth");

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    // const { user } = userAuth;q
    //send respose back with profile details
    res.send("User profile: " + req.user);
  } catch (err) {
    // console.log(err.message);
    res.status(404).send("ERROR:  " + err.message);
  }
});
module.exports = { profileRouter };
