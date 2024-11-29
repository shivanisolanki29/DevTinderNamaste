const express = require("express");
const { connectDB } = require("./config/database.js");
const { Users } = require("./Models/User.js");
const { userAuth } = require("./middleware/auth.js");
const validator = require("validator");
const { ValidationSignUp } = require("./Utils/Validations.js");
const bcrypt = require("bcrypt");
const app = new express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

// Middleware to handle JSON
app.use(express.json());

//Middle ware to Parser the cooking (JWT)
app.use(cookieParser());
//read data from db

app.post("/signup", async (req, res) => {
  try {
    //validate the data

    ValidationSignUp(req);

    const { firstName, lastName, email, password } = req.body;
    //encrypt the password
    const pwdHash = await bcrypt.hash(password, 10);

    // const user = new Users(req.body);//this is not a good way directly pass req.body
    const user = new Users({
      firstName,
      lastName,
      email,
      password: pwdHash,
    }); //this is a good way directly pass req.body

    // throw new error("xyz");
    await user.save();
    //res.send("Add user successfully");
    res.send(`${user.firstName} successfully added in DB`);
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //verify email
    // const validateEmail = (email) => {
    if (!email || !validator.isEmail(email)) {
      throw new Error("Invalid credential");
    }

    //read data (email and password) from db
    const userDb = await Users.findOne({ email: email });

    //comapre the password req.body and DB
    const isValidPass = await bcrypt.compare(password, userDb.password);

    // const timeExpire = new Date('28/11/2024T');
    if (isValidPass) {
      let token = await jwt.sign({ _id: userDb._id }, "Dev@Tinder123");
      // , {expiresIn: 30,});
      // send res back with Jwt wrap in cookies + success message
      res.cookie("token", token);
      // { expires: new Date(Date.now() + 10 * 1000) }); //create token with jwt expire in 10 sec
      // res.cookie("token", "dsgfjgfajkffffffffffbdhjgdjffffhdfksjakfkjfgg"); //create dummy cookie by myself

      res.send("Login successfully");
    } else {
      throw new Error(" Invalid credential");
    }

    // };
  } catch (err) {
    res.status(404).send("ERROR:  " + err.message);
  }

  //compare email check if matches or not
  //copmare password check if matches or not
});

//read/get profile details from DB
app.get("/profile", userAuth, async (req, res) => {
  try {
    // const { user } = userAuth;q
    //send respose back with profile details
    res.send("User profile: " + req.user);
  } catch (err) {
    // console.log(err.message);
    res.status(404).send("ERROR:  " + err.message);
  }
});

app.post("/sendconnection", userAuth, (req, res) => {
  try {
    //verify auth

    //send connection
    res.send("connection successfully with " + req.user.firstName);
    //
  } catch (err) {
    res.status(404).send("ERR : " + err.message);
  }
});
connectDB()
  .then(() => {
    console.log("Datebase connection established... ");
    app.listen(3000, () => {
      console.log("Server is successfully listening on port 3000....");
    });
  })
  .catch((err) => {
    console.error("db not connected");
  });
