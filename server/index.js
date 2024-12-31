// import express from "express";
// import cors from "cors";
// import connectDB from "./config/connectDB.js";
// import cookiesParser from "cookie-parser";
// import router from "./routes/index.js";
// import { app, server } from "./socket/index.js";

// import dotenv from "dotenv";
// dotenv.config();

// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
//   })
// );
// app.use(express.json());
// app.use(cookiesParser());

// const PORT = process.env.PORT || 8080;

// app.get("/", (request, response) => {
//   response.json({
//     message: "Server running at " + PORT,
//   });
// });

// //api endpoints
// app.use("/api", router);

// connectDB().then(() => {
//   server.listen(PORT, () => {
//     console.log("server running at " + PORT);
//   });
// });

import express from "express";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import cookiesParser from "cookie-parser";
import router from "./routes/index.js";
import { app, server } from "./socket/index.js";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

// Middleware setup
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookiesParser());

// Static file serving for frontend
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/client/build")));

// Catch-all route for serving React's index.html
app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
);

// API endpoints
app.use("/api", router);

// Default route
app.get("/", (request, response) => {
  response.json({
    message: "Server running at " + PORT,
  });
});

// Connect to the database and start the server
const PORT = process.env.PORT || 8080;
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log("Server running at " + PORT);
  });
});
