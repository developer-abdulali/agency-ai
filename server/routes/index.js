import express from "express";
import registerUser from "../controller/registerUser.js";
import checkEmail from "../controller/checkEmail.js";
import checkPassword from "../controller/checkPassword.js";
import userDetails from "../controller/userDetails.js";
import updateUserDetails from "../controller/updateUserDetails.js";
import searchUser from "../controller/searchUser.js";
import forgotPassword from "../controller/forgotPassword.js";
import resetPassword from "../controller/resetPassword.js";
import logoutUser from "../controller/logout.js";

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

export default router;
