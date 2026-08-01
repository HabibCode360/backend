import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
// i will deploy this to the vercel 

function connectDB() {
  mongoose
    .connect(process.env.MONGODB_URI as string)
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
      process.exit(1); // Exit the process with an error code
    });
}

export default connectDB;