const express = require("express");

const app = new express();

//handle the request and send back response

app.use((req, res) => {
  res.send("Hello added try with new ");
});

//api /route handler
app.use("/test", (req, res) => {
  res.send("testnodemon Hello added");
});
app.listen(3000, () => {
  console.log("hello from server");
});
