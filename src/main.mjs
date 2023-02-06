import { expressRestApi } from "./server/server.mjs";
import { logger, loggerNoTimestamp } from "./logging/index.mjs";
import chalk from "chalk";

// Main entrypoint
(async () => {
  try {
    loggerNoTimestamp.info(
      chalk.rgb(152, 251, 152).bold("  Starting server...")
    );

    await expressRestApi();

    process.on("SIGINT", async () => {
      loggerNoTimestamp.info(
        chalk.rgb(152, 251, 152).bold("  Shutting down...\n")
      );
      process.exit(0);
    });
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
})();
