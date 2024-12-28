const UserModel = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUserDetailFrmToken = async (token) => {
  if (!token) {
    return {
      message: "sesstion out",
      logout: true,
    };
  }

  const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await UserModel.findById(decode.id).select("-password");

  return user;
};

module.exports = getUserDetailFrmToken;
