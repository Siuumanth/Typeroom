
import mongoose from "mongoose";


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URL, {
            dbName: process.env.DB_NAME,
            serverSelectionTimeoutMS: 5000, // Wait 5 seconds before failing
        });

        console.log(`\n ✅ MongoDB Connected! DB Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("❌ MongoDB connection error:", error.message);
        process.exit(1);
    }
};


export default connectDB;