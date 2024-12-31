import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connect to DB");
    });

    connection.on("error", (error) => {
      console.log("Something is wrong in mongodb ", error);
    });
  } catch (error) {
    console.log("Something is wrong ", error);
  }
};

export default connectDB;
