import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import path from "path";
import cors from "cors";
import { createServer } from "http";

import { initializeSocket } from "./lib/socket.js";

import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import songRoutes from "./routes/songs.routes.js";
import albumRoutes from "./routes/album.routes.js";
import statsRoutes from "./routes/stats.routes.js";

dotenv.config();

const __dirname = path.resolve();
const app = express();
const port = process.env.PORT || 5000;

const httpServer = createServer(app);
initializeSocket(httpServer);

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://<your-vercel-domain>"
        : "http://localhost:3000",
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(clerkMiddleware());

// File Upload Middleware
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
      fileSize: 1024 * 1024 * 10, // max file size 10MB
    },
  })
);

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statsRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  });
}

// error handlers
app.use((err, req, res, next) => {
  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

// Root Route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start Server
httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  connectDB();
});
