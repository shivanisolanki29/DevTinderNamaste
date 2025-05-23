const { default: mongoose, model, Schema } = require("mongoose");
const { default: isEmail } = require("validator/lib/isEmail");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
      enum: {
        values: ["male", "female", "others"],
        message: `{VALUE} is not gender type `,
      },
      // validate(value) {
      //   if (!["male", "female", "others"].includes(value)) {
      //     throw new Error("Gender data not valid");
      //   }
      // },
    },
    photoUrl: {
      type: String,
      default:
        "https://kobikoachman.com/wp-content/uploads/2018/03/dummyProfile-male.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Photo URL " + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is a default about of the user!",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

UserSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "Dev@Tinder123", {
    expiresIn: "7d",
  });
  return token;
};

UserSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;

  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPasswordValid;
};
//note change model name - collectionname in database from usermodels to users
const Users = new model("User", UserSchema);
//const users = mongoose.model(users,UserSchema)
//module.exports = mongoose.model(users,UserSchema)

module.exports = { Users };
