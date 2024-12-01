const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const bcrypt = require("bcrypt");
const {
  validationProfileEdit,
  validatePassword,
} = require("../Utils/Validations");
const { contains } = require("validator");
const { Users } = require("../Models/User");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    // const { user } = userAuth;q
    //send respose back with profile details
    res.send("User profile: " + req.user);
  } catch (err) {
    // console.log(err.message);
    res.status(404).send("ERROR:  " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    console.log("start");
    //always check data senitization
    validationProfileEdit(req);
    console.log("End validation");
    const allowedEditFields = [
      "firstName",
      "lastName",
      "about",
      "age",
      "skills",
      "gender",
      "photoUrl",
    ];
    const isAllowed = Object.keys(req.body).every((key) =>
      allowedEditFields.includes(key)
    );
    if (!isAllowed) {
      throw new Error("Update not allowed");
    }
    //user come from userAuth
    const loggedInUser = req.user;

    //Upadate in db
    await Object.keys(req.body).every(
      (key) => (loggedInUser[key] = req.body[key])
    );

    await loggedInUser.save();
    res.send("Update succssfully");
  } catch (err) {
    res.status(401).send("ERROR: " + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { password } = req.body;

    //password validate is present or strong password
    validatePassword(password);

    //bcrypt.compare if old password and new password same
    const loggedInUser = req.user;
    const compOldPwdWithNewPassword = await bcrypt.compare(
      password,
      loggedInUser.password
    );

    if (compOldPwdWithNewPassword) {
      throw new Error("same password, Please update");
    }
    //bcrypt new password
    const newPasswordHash = await bcrypt.hash(password, 10);

    //update in db
    const user = await Users.findByIdAndUpdate(loggedInUser._id, {
      password: newPasswordHash,
    });

    await loggedInUser.save();

    res.send("new password updated successfully");
  } catch (err) {
    res.status(401).send("ERROR: " + err.message);
  }
});
module.exports = { profileRouter };
