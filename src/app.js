const express = require("express");

const app = new express();

app.get("/hello", (req, res) => {
  res.send({
    firstname: "Node",
    lastname: "JS",
  });
});
app.post("/hello", (req, res) => {
  res.send("Successfully update db");
});

app.delete("/hello/:userid/:name/:password", (req, res) => {
  res.send("record delete");
});
//api /route handler
app.use("/test", (req, res) => {
  res.send("testnodemon Hello added");
});
app.listen(3000, () => {
  console.log("hello from server");
});
/*
- season 02
  -episode04
  //const express = require("express");

const app = new express();

//handle the request and send back response

// app.use((req, res) => {
// res.send("Hello added try with new ");
// });

app.use("/hello", (req, res) => {
res.send("Hello 2332 Hello Hello");
});

//api /route handler
app.use("/test", (req, res) => {
res.send("testnodemon Hello added");
});
app.listen(3000, () => {
console.log("hello from server");
});

*/
