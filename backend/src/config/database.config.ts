import mongoose from "mongoose";
import { config } from "./app.config";
import { logger } from '../lib/winston';

const connectDatabase = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    logger.info("Connected to Mongo database");
  } catch (error) {
    logger.error("Error connecting to Mongo database");
    process.exit(1);
  }
};

export default connectDatabase;
