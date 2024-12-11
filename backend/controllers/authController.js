import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import errorHandler from "../utils/errorHandler.js";

// signup user function
export const signupUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return next(errorHandler(400, "User already exists"));

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// login user function
export const signinUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return next(errorHandler(404, "User not found!"));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(errorHandler(401, "Wrong crendentials!"));

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    const { password: pass, ...rest } = user._doc;

    res.cookie("access_token", token, { httpOnly: true }).status(200).json({
      success: true,
      message: "Logged in successfully",
      user: rest,
    });
  } catch (error) {
    console.log(error);
    next(errorHandler(error));
  }
};

// signout user function
export const signoutUser = async (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};
