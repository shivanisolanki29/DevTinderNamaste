const jwt = require("jsonwebtoken");
const { Users } = require("../Models/User");

const userAuth = async (req, res, next) => {
  try {
    //cookie come with req and Extact token from cookies
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).send("Please login..");
      // throw new Error("Invalid token!!");
    }
    //verify  or compare token and extract secret data (_id)
    const decodedMsg = await jwt.verify(token, "Dev@Tinder123");

    const { _id } = decodedMsg;

    //find user by id in DB
    const user = await Users.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    // req.name = "shivani";
    next();
  } catch (err) {
    res.status(404).send("ERROR:  " + err.message);
  }
};

module.exports = { userAuth };
