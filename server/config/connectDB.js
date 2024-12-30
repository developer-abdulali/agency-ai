// const mongoose = require("mongoose");

// async function connectDB() {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);

//     const connection = mongoose.connection;

//     connection.on("connected", () => {
//       console.log("Connect to DB");
//     });

//     connection.on("error", (error) => {
//       console.log("Something is wrong in mongodb ", error);
//     });
//   } catch (error) {
//     console.log("Something is wrong ", error);
//   }
// }

// module.exports = connectDB;
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
