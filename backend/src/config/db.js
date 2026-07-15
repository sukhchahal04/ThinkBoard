import mongoose from "mongoose";
import dns from "dns";

// Use public DNS resolvers to fix SRV lookup issues (querySrv ECONNREFUSED)
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URL);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Error:", error.message);
  }
};

export default connectDB;