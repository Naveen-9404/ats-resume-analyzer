import http from "http";

import app from "./app.js";
import env from "./config/env.js";
import connectDatabase from "./config/database.js";
import logger from "./config/logger.js";

const startServer = async () => {
  try {
    // Connect Database
    await connectDatabase();

    // Create HTTP Server
    const server = http.createServer(app);

    server.listen(env.port, () => {
      logger.success(
        `🚀 Server running on http://localhost:${env.port}`
      );

      logger.info(
        `Environment: ${env.nodeEnv}`
      );
    });

    // Graceful Shutdown
    const shutdown = (signal) => {
      logger.warn(
        `${signal} received. Shutting down server...`
      );

      server.close(() => {
        logger.success(
          "HTTP server closed successfully."
        );
        process.exit(0);
      });
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));

  } catch (error) {
    logger.error(
      "Failed to start server",
      error
    );

    process.exit(1);
  }
};

startServer();