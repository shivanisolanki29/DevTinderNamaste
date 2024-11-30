const express = require("express");
const authRouter = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ValidationSignUp } = require("../Utils/Validations.js");
const { Users } = require("../Models/User.js");
const { now } = require("mongoose");
const validator = require("validator");

console.log("heloo from router");

authRouter.post("/signup", async (req, res) => {
  try {
    ValidationSignUp(req);

    const { firstName, lastName, email, password } = req.body;
    const pwdHash = await bcrypt.hash(password, 10);

    const user = new Users({
      firstName,
      lastName,
      email,
      password: pwdHash,
    });

    await user.save();
    res.send(`${user.firstName} successfully added in DB`);
    // res.send(` successfully added in DB`);
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !validator.isEmail(email)) {
      throw new Error("Invalid credential");
    }

    const userDb = await Users.findOne({ email: email });
    const isValidPass = await bcrypt.compare(password, userDb.password);

    if (isValidPass) {
      let token = await jwt.sign({ _id: userDb._id }, "Dev@Tinder123", {
        expiresIn: "7d",
      });
      res.cookie("token", token).send("Login successfully");
    } else {
      throw new Error(" Invalid credential");
    }
  } catch (err) {
    res.status(404).send("ERROR:  " + err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("Logout");
});
module.exports = { authRouter };
