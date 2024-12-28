const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "name is required!"] },
    email: {
      type: String,
      required: [true, "email is required!"],
      unique: true,
    },
    password: { type: String, required: [true, "password is required!"] },
    profile_pic: { type: String, default: "" },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
