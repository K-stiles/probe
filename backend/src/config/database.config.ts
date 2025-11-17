import mongoose from "mongoose";
import { config } from "./app.config";
import { logger } from "../lib/winston";

const connectDatabase = async () => {
  try {
    await mongoose.connect(config.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });
    logger.info("Connected to Mongo database");
  } catch (error) {
    logger.error("MongoDB connection error:", (error as Error).message);
    logger.error("Full error:", error);
    logger.error("Error connecting to Mongo database");
    process.exit(1);
  }
};

export default connectDatabase;
