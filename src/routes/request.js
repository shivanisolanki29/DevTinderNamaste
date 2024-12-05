const express = require("express");
const requestRouter = express.Router();
const { ConnectionRequest } = require("../Models/connenctionRequest");

const { userAuth } = require("../middleware/auth");
const { Users } = require("../Models/User");
const { connection } = require("mongoose");

requestRouter.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.userId;
      const status = req.params.status;

      //validate status, toUserid from req
      if (!["ignored", "interested"].includes(status)) {
        return res.status(400).send("Invalid status");
      }

      const toUser = await Users.findById(toUserId);
      if (!toUser) {
        return res.status(400).send("Invalid toUser, cannot send request");
      }

      //validate corner cases
      //case01 {if there is an existing connection request }
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          {
            fromUserId: toUserId,
            toUserId: fromUserId,
          },
          { fromUserId, toUserId },
        ],
      });
      // console.log(existingConnectionRequest);
      //if find atleast one connection throw error
      if (existingConnectionRequest) {
        return res.status(400).send({
          message: "Connection request already sent ",
        });
      }

      const connectionReq = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionReq.save();
      res.json({
        message: req.user.firstName + " " + status + " " + toUser.firstName,
        data,
      });
    } catch (err) {
      res.status(404).send("ERR : " + err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];

      if (!allowedStatus.includes(status)) {
        return res.status(404).send("Invalid status ");
      }

      //check if status interrested
      const reviewRequest = await ConnectionRequest.findOne({
        _id: requestId,
        status: "interested",
        toUserId: loggedInUser._id,
      });

      if (!reviewRequest) {
        return res.status(404).send("Invalid request ");
      }
      //check if status 
      reviewRequest.status = status;

      const data = await reviewRequest.save();

      res.json({
        message: "connection " + status,
        data,
      });
    } catch (err) {
      res.status(404).send("ERR: " + err.message);
    }
  }
);

module.exports = { requestRouter };
// -post/request/send/:status/:toUserId (userId - to whom send the request )
//case01 { fromUser send req  to toUser  and same toUser send req to fromUser } done
//case02 { same user send req to userself} done

//case03{ save dublicate send req in db} done

//case04 { if Fromuser send req to touser cannot send same req again } done

// -post/request/review/:status/:requestId (requestId - req object it to review request)
//=first check req body -->status,[ignored, interested] done
//= requestid
//= loggedin should be toUser
//=status should be interested
