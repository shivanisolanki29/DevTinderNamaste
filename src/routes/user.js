const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const { ConnectionRequest } = require("../Models/connenctionRequest");
// -get /user/request/receive (status interested -->accepted/rejected)     -ep-13

const User_Safe_Date = "firstName lastName photoUrl age about gender skills";
userRouter.get(
  "/user/requests/received", //received request for accpeted/rejected
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      //   console.log(loggedInUser);
      //from db take connection/document where touser = loggedinuser and staus should be interested

      const data = await ConnectionRequest.find({
        toUserId: loggedInUser._id,
        status: "interested",
      }).populate("fromUserId", User_Safe_Date);
      // .populate("fromUserId", ["firstName", "lastName"]);

      if (!data) {
        return res.status(404).send("no received request...");
      }
      res.json({
        message: " received request are below ",
        data,
      });
    } catch (err) {
      res.status(400).send("ERR: " + err.message);
    }
  }
);

userRouter.get("/user/connection", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    //from db take all connection/documents where logged in user get or send req with status accepted
    console.log(loggedInUser.firstName);
    const ConnectionRequests = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser, status: "accepted" },
        { toUserId: loggedInUser, status: "accepted" },
      ],
    })
      .populate("fromUserId", User_Safe_Date)
      .populate("toUserId");

    console.log(ConnectionRequests);
    const data = ConnectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    res.json({
      message: "All my connections: ",
      data,
    });
  } catch (err) {
    res.status(400).send("ERR: " + err.message);
  }
});

module.exports = { userRouter };
