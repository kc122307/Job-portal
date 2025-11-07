import mongoose from "mongoose";
import dns from 'dns';

// Set DNS servers to use Google's public DNS
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async () => {
    try {
        console.log("Attempting to connect to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            family: 4
        });
        console.log("Mongoose connected successfully");
        return true;
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        throw new Error("MongoDB connection failed");
    }
}

export default connectDB;