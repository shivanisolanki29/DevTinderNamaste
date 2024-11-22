const express = require("express");
const { connectDB } = require("./config/database.js");
const { Users } = require("./Models/User.js");

const app = new express();

app.post("/signup", async (req, res) => {
  //create instace of model xyz
  const user = new Users({
    firstName: "Shardha",
    lastname: "Kapoor",
    email: "shardha@k.com",
    password: "shardha@123",
  });

  try {
    // throw new error("xyz");
    await user.save();
    //res.send("Add user successfully");
    res.send(`${user.firstName} successfully added`);
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
