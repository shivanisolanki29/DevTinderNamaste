const validator = require("validator");

const ValidationSignUp = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(email)) {
    throw new Error("Invalid emailid " + email);
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a strong password");
  }
};
const validationProfileEditData = (req) => {
  const { firstName, lastName, age, gender, skills, about } = req.body;

  if (req.body == {}) {
    throw new Error("no data to Update");
  }
  // if (firstName.length < 4 && firstName.length > 30) {
  //   throw new Error("Name should be greater then 4 character");
  // }
  if (age < 18) {
    throw new Error("age should be more then 18 year");
  }
  if (gender) {
    if (!["male", "female", "others"].includes(gender)) {
      // console.log(gender);
      throw new Error("Gender data not valid");
    }
  }
  if (skills) {
    if (skills.length > 10) {
      // console.log(skills);
      throw new Error("Skills should be less then or equal to 10");
    }
  }
  // if (!validator.isURL(req.body.photoUrl)) {
  //   throw new Error("Invalid Photo URL " + photoUrl);
  // }
  // if (!firstName || !lastName) {
  //   throw new Error("Please provide name");
  // }
  // // console.log(firstName.trim().length);
  // if (firstName.length < 4) {
  //   throw new Error("Name should be more then 4 ltter");
  // }
  // if (about.trim().split(/\s+/) < 100) {
  //   throw new Error("About should be less then 100 words");
  // }
};

const validatePassword = (password) => {
  if (!password) {
    throw new Error("Please enter a password");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a strong password");
  }
};
module.exports = {
  ValidationSignUp,
  validationProfileEditData,
  validatePassword,
};
