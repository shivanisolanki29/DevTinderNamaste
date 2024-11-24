const express = require("express");
const { connectDB } = require("./config/database.js");
const { Users } = require("./Models/User.js");
const app = new express();

// Middleware to handle JSON
const sm = app.use(express.json());
//read data from db

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

app.post("/signup", async (req, res) => {
  const user = new Users(req.body);
  try {
    // throw new error("xyz");
    await user.save();
    //res.send("Add user successfully");
    res.send(`${user.firstName} successfully added in DB`);
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await Users.findByIdAndUpdate(userId, { email: req.body.email });
    res.send(`${req.body.email} successfully updated in DB`);
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
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
