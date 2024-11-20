const express = require("express");

const app = new express();

app.use(
  "/hello",
  (err, eq, res, next) => {
    console.log("Handling route user 01");
    next();
    res.send("response 01");
  },
  [
    (req, res, next) => {
      console.log("Handling route user 02");
      next();
      res.send("2nd response!");
    },
    (req, res, next) => {
      console.log("Handling route user 03");
      next();
      res.send("3rd response!");
    },
  ],
  (req, res, next) => {
    console.log("Handling route user 04");
    res.send("4th response!");
  }
);

app.listen(3000, () => {
  console.log("hello from server");
});
