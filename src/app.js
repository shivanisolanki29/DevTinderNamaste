const express = require("express");
const app = new express();

//Error Handling ways

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("something went wrong");
  }
});
app.get("/getuserdata", (req, res) => {
  //2nd way to handling error using try..catch block and it is best way

  try {
    //logic for call DB and get userdata
    throw new Error("throw error from route");
    res.send("user data sent");
  } catch (err) {
    res.status(500).send("some error occure contact support team");
  }
});

//1 way to handle error
//"/" means match all routes

//if you write this code first not get below response because not get any error ,
//error got in app.get() handle function
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("something went wrong");
  }
});

app.listen(3000, () => {
  console.log("hello from server");
});
