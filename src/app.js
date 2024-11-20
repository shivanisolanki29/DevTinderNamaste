const express = require("express");
const app = new express();

const {
  adminAuthentication,
  userAuthentication,
} = require("./middleware/auth.js");

app.use("/admin", adminAuthentication);

app.get("/user", userAuthentication, (req, res) => {
  res.send("User login succesfully");
});

app.get("/admin/allusers", (req, res) => {
  res.send("send the data");
});

app.delete("/admin/delete", (req, res) => {
  res.send("deleted a user");
});

app.listen(3000, () => {
  console.log("hello from server");
});
