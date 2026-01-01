import mongoose from "mongoose";

const connectDB = async (connectionString) => {
  try {
    await mongoose.connect(connectionString);
    console.log(" MongoDB Connected Successfully");
  } catch (error) {
    console.error(" MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
