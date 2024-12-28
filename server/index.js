const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const router = require("./routes/index");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("API is running...");
});

// api routes
app.use("/api", router);

connectDB();
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
