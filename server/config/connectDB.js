// import mongoose from "mongoose";

// const connectDB = async () => {
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
// };

// export default connectDB;

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
    process.exit(1); // Exit the process if DB connection fails
  }
};
export default connectDB;
