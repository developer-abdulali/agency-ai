const UserModel = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getUserDetailFrmToken = require("../helpers/getUserDetailFrmToken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, profile_pic } = req.body;

    // Validate the input
    if (!name || !email || !password) {
      return res.status(400).json({
        error: true,
        message: "All fields are required.",
      });
    }

    // Check if the user is already registered
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        error: true,
        message: "User already exists.",
      });
    }

    // hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new user
    const newUser = new UserModel({
      name,
      email,
      profile_pic,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message || "Something went wrong.",
    });
  }
};

const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate the input
    if (!email) {
      return res.status(400).json({
        error: true,
        message: "Email is required.",
      });
    }

    // Check if the user is already registered
    const user = await UserModel.findOne({ email }).select("-password");
    if (!user) {
      return res.status(400).json({
        error: true,
        message: "User not exists.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User verify.",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message || "Something went wrong.",
    });
  }
};

const checkUserPassword = async (req, res) => {
  try {
    const { password, userId } = req.body;

    // Check if userId and password are provided
    if (!userId || !password) {
      return res.status(400).json({
        error: true,
        message: "User ID and password are required.",
      });
    }

    // Find the user
    const user = await UserModel.findById(userId);

    // If user is not found, return an error
    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User not found.",
      });
    }

    // Verify the user password
    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        error: true,
        message: "Invalid password.",
      });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    const cookieOptions = { httpOnly: true, secure: true };

    return res.cookie("token", token, cookieOptions).status(200).json({
      message: "Login successfully.",
      token: token,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message || "Something went wrong.",
    });
  }
};

// const checkUserPassword = async (req, res) => {
//   try {
//     const { password, userId } = req.body;

//     // find the user
//     const user = await UserModel.findById(userId);

//     // verify the user password
//     const isMatch = await bcryptjs.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({
//         error: true,
//         message: "Invalid password.",
//       });
//     }

//     // create jwt token
//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       process.env.JWT_SECRET_KEY,
//       {
//         expiresIn: "1h",
//       }
//     );

//     const cookieOptions = { http: true, secure: true };

//     return res.cookie("token", token, cookieOptions).status(200).json({
//       message: "Login successfully.",
//       token: token,
//       success: true,
//     });
//   } catch (error) {
//     res.status(500).json({
//       error: true,
//       message: error.message || "Something went wrong.",
//     });
//   }
// };

const getUserDetail = async (req, res) => {
  try {
    const token = req.cookies.token || "";
    const user = await getUserDetailFrmToken(token);

    return res.status(200).json({
      message: "User details",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message || "Something went wrong.",
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    const cookieOptions = { http: true, secure: true };

    return res.cookie("token", "", cookieOptions).status(200).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message || "Something went wrong.",
    });
  }
};

const updateUserDetail = async (req, res) => {
  try {
    const token = (await req.cookies.token) || "";

    if (!token) {
      return res.status(401).json({
        error: true,
        message: "Unauthorized access.",
      });
    }

    const user = await getUserDetailFrmToken(token);

    const { name, email, profile_pic } = req.body;

    const updateUser = await UserModel.updateOne(
      { _id: user._id },
      { name, email, profile_pic }
    );

    const userInfo = await UserModel.findById(user._id);

    return res.json({
      message: "User details updated successfully",
      data: userInfo,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message || "Something went wrong.",
    });
  }
};

module.exports = {
  registerUser,
  checkEmail,
  checkUserPassword,
  getUserDetail,
  logoutUser,
  updateUserDetail,
};
