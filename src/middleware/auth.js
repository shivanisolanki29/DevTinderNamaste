// const adminAuthentication = (req, res, next) => {
//   //
//   const token = "xyz";
//   const isAdminAuthValidation = token === "xyz";
//   if (!isAdminAuthValidation) {
//     res.status(404).send("unautherized admin request");
//   } else {
//     next();
//   }
// };

const jwt = require("jsonwebtoken");
const { Users } = require("../Models/User");

const userAuth = async (req, res, next) => {
  try {
    //cookie come with req and Extact token from cookies
    //parser the cookie using middle ware (cookie-parser)
    // app.use(cookieParser())
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Invalid token");
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

  // const req.user = user;

  // const authToken = "xyz";
  // const authValidation = authreq === authToken;
  // if (!authValidation) {
  //   res(404).send("unautherized user req");
  // } else {
  //   next();
  // }
};

module.exports = { userAuth };
