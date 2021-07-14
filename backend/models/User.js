const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a Name!"],
  },
  password: {
    type: String,
    required: [true, "Please add a Password!"],
    minlength: 6,
    select: false, //don't return the password when fetching the user
  },
});

//sign JWT & return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, "secret", {
    expiresIn: "30d",
  });
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
