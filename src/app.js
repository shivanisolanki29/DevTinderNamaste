const express = require("express");
const { connectDB } = require("./config/database.js");
const { Users } = require("./Models/User.js");
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

    if (isValidPass) {
      let token = await jwt.sign({ _id: userDb._id }, "Dev@Tinder123");
      // send res back with Jwt wrap in cookies + success message
      res.cookie("token", token); //create token with jwt
      // res.cookie("token", "dsgfjgfajkffffffffffbdhjgdjffffhdfksjakfkjfgg"); //create dummy cookie by myself

      // console.log(token);

      res.send("Successful login");
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
app.get("/profile", async (req, res) => {
  try {
    //cookie come with req
    const reqCookie = req.cookies;

    //parser the cookie using middle ware (cookie-parser)
    // const cookieParser = require("cookie-parser");
    // app.use(cookieParser())

    //Extact token from cookies
    const { token } = reqCookie;
    if (!token) {
      throw new Error("Cookie is not get it");
    }
    //veryfy it or compare it
    let decodeMsg = await jwt.verify(token, "Dev@Tinder123");

    //if varify true
    const { _id } = decodeMsg;

    const userwithId = await Users.findById({ _id });

    //send respose back with profile details
    res.send("User profile: " + userwithId);
  } catch (err) {
    // console.log(err.message);
    res.status(404).send("ERROR:  " + err.message);
  }
});

//get user by applying fliter
app.get("/user", async (req, res) => {
  // console.log(req.body._id);
  try {
    const FindUser = await Users.findOne({ firstName: "Sonam" });
    console.log("user with filter :" + FindUser);
    res.send("got data user by filter ");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

//get all users
app.get("/feed", async (req, res) => {
  try {
    const allUsers = await Users.find({});
    console.log("all users details:" + allUsers);
    res.send("Get all users data");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});
app.delete("/user", async (req, res) => {
  console.log("Hello from delete");
  const userdeleteId = req.body.userId;
  console.log(userdeleteId);
  try {
    await Users.findByIdAndDelete(userdeleteId);
    res.send("user delete");
  } catch (err) {
    res.status(400).send("Error delete the user:" + err.message);
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  console.log(data);
  try {
    const Allowed_Updates = ["age", "skills", "photoUrl", "gender"];
    const IsUpdateAllowed = Object.keys(data).every((k) =>
      Allowed_Updates.includes(k)
    );
    if (!IsUpdateAllowed) {
      throw new Error("Update Not allowed");
    }

    if (data?.skills.length > 10) {
      throw new Error("skills Not be more then 10");
    }
    await Users.findByIdAndUpdate(userId, data, { runValidators: true });
    res.send(`${data} successfully updated in DB`);
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("succesfully connected DB");
    app.listen(3000, () => {
      console.log("hello from server");
    });
  })
  .catch((err) => {
    console.error("db not connected");
  });
