const express = require("express");
const registerUser = require("../controller/registerUser");
const checkEmail = require("../controller/checkEmail");
const checkPassword = require("../controller/checkPassword");
const userDetails = require("../controller/userDetails");
const updateUserDetails = require("../controller/updateUserDetails");
const searchUser = require("../controller/searchUser");
const forgotPassword = require("../controller/forgotPassword");
const resetPassword = require("../controller/resetPassword");
const logoutUser = require("../controller/logout");

const router = express.Router();

//create user api
router.post("/register", registerUser);
//check user email
router.post("/email", checkEmail);
//check user password
router.post("/password", checkPassword);
//login user details
router.get("/user-details", userDetails);
//logout user
router.get("/logout", logoutUser);
//update user details
router.post("/update-user", updateUserDetails);
//search user
router.post("/search-user", searchUser);
//forgot password
router.post("/forgot-password", forgotPassword);
//reset password by token
router.post("/reset-password/:token", resetPassword);

module.exports = router;
