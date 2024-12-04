const express = require("express");
const requestRouter = express.Router();
const { ConnectionRequest } = require("../Models/connenctionRequest");

const { userAuth } = require("../middleware/auth");
const { Users } = require("../Models/User");

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
          message: "already sent request to ",
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

module.exports = { requestRouter };
//case01 { fromUser send req  to toUser  and same toUser send req to fromUser }
//case02 { same user send req to userself}

//case03{ save dublicate send req in db}

//case04 { if Fromuser send req to touser cannot send same req again }

//logical query to retrive data from database
// await AkshaySendReq.save();
