const { mongoose } = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["interested", "ignored", "accepted", "rejected"],
        message: `{value} incorrect status type`,
      },
    },
  },
  { timestamps: true }
);

connectionRequestSchema.pre("save", function (next) {
  // console.log("insise middleware pre()");
  const connectionRequest = this;
  // console.log(connectionRequest);
  //check if the fromUserId is same as touserId
  let compVal = connectionRequest.fromUserId.equals(connectionRequest.toUserId);
  // console.log(compVal);
  if (compVal) {
    throw new Error("Cannot send connection request to yourself");
  }
  next();
});

const ConnectionRequest = new mongoose.model(
  "connectionRequest",
  connectionRequestSchema
);

module.exports = { ConnectionRequest };
