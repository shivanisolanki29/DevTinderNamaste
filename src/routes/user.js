const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const { ConnectionRequest } = require("../Models/connenctionRequest");
const { Users } = require("../Models/User");
// -get /user/request/receive (status interested -->accepted/rejected)     -ep-13

const User_Safe_Data = "firstName lastName photoUrl age about gender skills";
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
      }).populate("fromUserId", User_Safe_Data);
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
      .populate("fromUserId", User_Safe_Data)
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

//user/feed api
userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page = req.query.page || 1;
    let limit = req.query.limit || 10;
    const skip = (page - 1) * limit;
    //validate limit
    limit = limit > 50 ? 50 : limit;
    //user can not see - loggedinuser sent or receive req and loggedin user

    const connenctionReqs = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");
    // .populate("fromUserId", "firstName lastName")
    // .populate("toUserId", "firstName lastName");
    const hideUserFromFeed = new Set();

    connenctionReqs.forEach((req) => {
      hideUserFromFeed.add(req.fromUserId.toString());
      hideUserFromFeed.add(req.toUserId.toString());
    });

    const userFeed = await Users.find({
      $and: [
        { _id: { $nin: Array.from(hideUserFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(User_Safe_Data)
      .skip(skip)
      .limit(limit);

    res.json({
      message: "feed users:",
      data: userFeed,
    });
  } catch (err) {
    res.status(400).send("ERR : " + err.message);
  }
});
module.exports = { userRouter };
