import dotenv from "dotenv";
import chalk from "chalk";
import express from "express";
import { logger, loggerNoTimestamp, logMiddleware } from "../logging/index.mjs";

// Express REST API
export const expressRestApi = async () => {
  dotenv.config();
  const port = process.env.PORT || 3000;
  const host = process.env.HOST || "localhost";
  // const env = process.env.NODE_ENV || "dev";

  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(logMiddleware);

  app.get("/", (req, res) => {
    // logger.info("In / catch all route");
    res.send("Server running...");
  });

  app.listen(port, () => {
    const serverURL = chalk.rgb(198, 85, 8).underline(`http://${host}:${port}`);
    loggerNoTimestamp.info(
      `Server running at: ${serverURL} -- Press CTRL-C to stop`
    );
  });

  app.use((err, req, res, next) => {
    if (err.stack && err.stack !== null) logger.error(err.stack);
    res.status(500).send("Internal REST API Server Error");
  });
};
