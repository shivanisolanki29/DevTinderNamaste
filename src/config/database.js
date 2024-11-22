const mongoos = require("mongoose");

//retun a promise use Async- await function
// mongoose.connect(
//   "mongodb+srv://shivanisolanki2882:8t66CY7zYFPVo0l0@nodecluster.jbw2z.mongodb.net/"
// );

const connectDB = async () => {
  await mongoos.connect(
    "mongodb+srv://shivanisolanki2882:8t66CY7zYFPVo0l0@nodecluster.jbw2z.mongodb.net/devTinder"
  );
};

//const DB =
// connectDB()
//   .then(() => {
//     console.log("succesfully conne cted DB");
//   })
//   .catch((err) => {
//     console.error("db not connected");
//   });

module.exports = { connectDB };
