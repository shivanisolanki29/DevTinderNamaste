const express = require("express");

const app = new express();

app.get("/hello", (req, res) => {
  console.log(req.query.user);
  res.send({
    firstname: "Node",
    lastname: "JS",
  });
});
app.post("/hello", (req, res) => {
  res.send("Successfully update db");
});

app.delete("/hello", (req, res) => {
  res.send("record delete");
});
//api /route handler
app.use("/test", (req, res) => {
  res.send("testnodemon Hello added");
});
app.listen(3000, () => {
  console.log("hello from server");
});
