const { default: mongoose, model, Schema } = require("mongoose");
const { default: isEmail } = require("validator/lib/isEmail");
const validator = require("validator");

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 30,
      trim: true,
    },
    lastName: { type: String, trim: true },
    email: {
      type: String,
      lowercase: true,
      required: true,
      trim: true,
      unique: true,
      validate(value) {
        // console.log("value from email schema" + value);
        if (!validator.isEmail(value)) {
          throw new Error("Invalid emailid " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong password");
        }
      },
    },
    age: { type: Number, min: "18", trim: true },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender data not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://kobikoachman.com/wp-content/uploads/2018/03/dummyProfile-male.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid URL ");
        }
      },
    },
    skills: [String],
  },
  { timestamps: true }
);
//note change model name - collectionname in database from usermodels to users
const Users = new model("User", UserSchema);
//const users = mongoose.model(users,UserSchema)

module.exports = { Users };
