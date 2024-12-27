import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import songRouter from "./routes/songRoute.js";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";

// Load environment variables from .env file
dotenv.config();

// app config
const app = express();
const port = process.env.PORT || 3000;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/song", songRouter);

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
