import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: "note",
    })
    .then(() => {
      console.log("Connected to database!");
    })
    .catch((err) => {
      console.log("Some error occured while connecting to database:", err);
    });
};
export default connectDB;
