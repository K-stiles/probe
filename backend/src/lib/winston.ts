import winston from "winston";
import { config } from "../config/app.config";

const { combine, timestamp, json, errors, align, printf, colorize } =
  winston.format;

// Define transport arrary to hold all logging transports
const transports: winston.transport[] = [];

// If application is not running in production, add a Console transport
if (process.env.NODE_ENV !== "production") {
  transports.push(
    new winston.transports.Console({
      format: combine(
        colorize({ all: true }), // Enable colorized output for console
        timestamp({ format: "YYYY-MM-DD HH:mm:ss A" }), // Add timestamp to log entries
        align(), // Align log entries
        printf(({ timestamp, level, message, ...meta }) => {
          const metaString = Object.keys(meta).length
            ? `\n${JSON.stringify(meta, null, 2)}`
            : "";
          return `[${timestamp}] ${level.toUpperCase()}: ${message}${metaString}`;
        }) // Define log message format
      ),
    })
  );
}

// Create the Winston logger instance with the defined transports and format
export const logger = winston.createLogger({
  level: config.LOG_LEVEL, // Set the minimum log level
  format: combine(timestamp(), errors({ stack: true }), json()), // Use JSON format log message with timestamp and error stack traces
  transports, // Add the defined transports
  silent: config.NODE_ENV === "test", // Disable logging during tests
})
