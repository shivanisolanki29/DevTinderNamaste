const { default: mongoose, model, Schema } = require("mongoose");

const UserSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
  age: { type: Number },
  gender: { type: String },
});

const Users = new model("UserModels", UserSchema);
//const users = mongoose.model(users,UserSchema)

module.exports = { Users };
