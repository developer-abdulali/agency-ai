import crypto from "crypto";
import bcryptjs from "bcryptjs";
import UserModel from "../models/UserModel.js";

const resetPassword = async (request, response) => {
  try {
    const { token } = request.params;
    const { password } = request.body;

    // Hash the token and find user
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await UserModel.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }, // Ensure token is not expired
    });

    if (!user) {
      return response.status(400).json({
        message: "Invalid or expired reset token",
        error: true,
      });
    }

    // Hash the new password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    // Update user's password and clear reset token fields
    user.password = hashPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    response.status(200).json({
      message: "Password reset successfully",
      success: true,
    });
  } catch (error) {
    response.status(500).json({
      message: error.message || "Error occurred",
      error: true,
    });
  }
};

export default resetPassword;
