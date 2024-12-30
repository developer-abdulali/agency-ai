import crypto from "crypto";
import UserModel from "../models/UserModel.js";
import nodemailer from "nodemailer";

const forgotPassword = async (request, response) => {
  try {
    const { email } = request.body;

    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return response.status(404).json({
        message: "User not found",
        error: true,
      });
    }

    // Generate reset token
    const resetToken = user.getResetPasswordToken();

    // Save token and expiration in the database
    await user.save({ validateBeforeSave: false });

    // Create reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    // Email message
    const message = `
      <h1>Password Reset Request</h1>
      <p>You have requested to reset your password.</p>
      <p>Please click the link below to reset your password:</p>
      <a href="${resetUrl}" clicktracking=off>${resetUrl}</a>
    `;

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"MERN Chat App" <${process.env.SMTP_EMAIL}>`,
      to: user.email,
      subject: "Password Reset Request",
      html: message,
    });

    response.status(200).json({
      message: "Reset email sent successfully",
      success: true,
    });
  } catch (error) {
    response.status(500).json({
      message: error.message || "Error occurred",
      error: true,
    });
  }
};

export default forgotPassword;
