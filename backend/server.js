import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import cookieParser from "cookie-parser";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// middleware
const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// api routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

// port
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Hi from the MERN Note App backend!");
});

// app listeners
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// error handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
