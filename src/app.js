const express = require("express");

const { connectDB } = require("./config/database.js");

const { authRouter } = require("./routes/auth.js");
const { profileRouter } = require("./routes/profile.js");
const { requestRouter } = require("./routes/request.js");
const { userRouter } = require("./routes/user.js");

const cors = require("cors");
const app = new express();
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("Datebase connection established... ");
    app.listen(3000, () => {
      console.log("Server is successfully listening on port 3000....");
    });
  })
  .catch((err) => {
    // throw new Error(err.message);
    console.log("db not connected");
    console.log(err.message);
    return err.message;
  });
