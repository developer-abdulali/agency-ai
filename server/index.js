import express from "express";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import cookiesParser from "cookie-parser";
import router from "./routes/index.js";
import { app, server } from "./socket/index.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8080;

// Middleware setup
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookiesParser());

// API endpoints
app.use("/api", router);

// Default route
app.get("/", (request, response) => {
  response.json({
    message: "Server running at " + PORT,
  });
});

// Connect to the database and start the server
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log("Server running at " + PORT);
  });
});
