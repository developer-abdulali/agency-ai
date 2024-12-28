const express = require("express");
const {
  registerUser,
  checkEmail,
  checkUserPassword,
  getUserDetail,
  logoutUser,
  updateUserDetail,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/email", checkEmail);
router.post("/password", checkUserPassword);
router.get("/user-details", getUserDetail);
router.get("/logout", logoutUser);
router.post("/update-user", updateUserDetail);

module.exports = router;
