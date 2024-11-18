import mongoose from "mongoose";

const connectDB = async () => {
    try {
        console.log("Attempting to connect to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongoose connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1); // Exit process on failure
    }
}

export default connectDB;