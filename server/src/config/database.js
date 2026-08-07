import mongoose from "mongoose";
import env from "./env.js";
import logger from "./logger.js";

const connectDatabase = async () => {
  try {
    mongoose.set("strictQuery", true);

    await mongoose.connect(env.mongoUri);

    logger.success("MongoDB connected successfully");
  } catch (error) {
    logger.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};

mongoose.connection.on("connected", () => {
  logger.info("MongoDB connection established");
});

mongoose.connection.on("error", (error) => {
  logger.error("MongoDB connection error", error);
});

mongoose.connection.on("disconnected", () => {
  logger.warn("MongoDB disconnected");
});

const gracefulShutdown = async () => {
  try {
    await mongoose.connection.close();

    logger.info("MongoDB connection closed");

    process.exit(0);
  } catch (error) {
    logger.error("Error while closing MongoDB connection", error);

    process.exit(1);
  }
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

export default connectDatabase;