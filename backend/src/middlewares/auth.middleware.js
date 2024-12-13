import { clerkClient } from "@clerk/express";
import dotenv from "dotenv";

dotenv.config();

export const isLoggedIn = async (req, res, next) => {
  if (!req.auth.userId) {
    return res
      .status(401)
      .json({ error: "Unauthorized - you must be logged in" });
  }
  next();
};

export const isAdmin = async (req, res, next) => {
  try {
    const currentUser = await clerkClient.users.getUser(req.auth.userId);
    const isAdmin =
      process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

    // Check if user is not admin
    if (!isAdmin) {
      return res
        .status(403)
        .json({ error: "Forbidden - you must be an admin" });
    }
    next();
  } catch (error) {
    next(error);
  }
};
